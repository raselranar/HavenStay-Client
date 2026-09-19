"use client";

import React, { useState } from "react";
import {
  Check,
  X,
  ShieldAlert,
  MessageSquarePlus,
  Edit,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import EditPropertyModal from "@/components/modals/edit-property-modal";
import DeleteConfirmation from "@/components/ui/delete-confirmation";
import { serverMutate } from "@/lib/core/server";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function AdminPropertiesPage({ items = [] }) {
  const router = useRouter();
  const [rejectTarget, setRejectTarget] = useState(null);
  const [feedbackText, setFeedbackText] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [selectedDeleteTarget, setSelectedDeleteTarget] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 6;
  const filteredItems = Array.isArray(items) ? items : [];
  const totalPages = Math.max(1, Math.ceil(filteredItems.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const visibleItems = filteredItems.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const handleApprove = async (item) => {
    const propertyId = item._id;
    try {
      const res = await serverMutate(
        `/api/admin/properties/${propertyId}/status`,
        "PATCH",
        {
          status: "approved",
        },
      );
      if (res.modifiedCount !== 0) {
        toast.success("Property successfully approved");
        router.refresh();
        return;
      }
      toast.error("Failed to update property status");
    } catch {
      toast.error("Failed to execute status update");
    }
  };

  const openRejectModal = (item) => {
    setRejectTarget(item);
    setFeedbackText("");
  };

  const openUpdateModal = (item) => {
    setEditingProperty(item);
    setIsEditOpen(true);
  };

  const closeUpdateModal = () => {
    setEditingProperty(null);
    setIsEditOpen(false);
  };

  const openDeleteConfirm = (item) => {
    setSelectedDeleteTarget(item);
    setConfirmDeleteOpen(true);
  };

  const confirmDelete = async () => {
    const item = selectedDeleteTarget;
    if (!item) return;

    const propertyId = item._id;
    setDeleteLoading(true);

    try {
      const res = await serverMutate(
        `/api/admin/properties/${propertyId}`,
        "DELETE",
      );
      if (res.deletedCount !== 0) {
        toast.success("Property deleted successfully");
        setConfirmDeleteOpen(false);
        setSelectedDeleteTarget(null);
        router.refresh();
        return;
      }
      toast.error("Failed to delete property");
    } catch {
      toast.error("Failed to execute delete request");
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleEditSuccess = () => {
    closeUpdateModal();
    router.refresh();
  };

  const handleRejectSubmit = async () => {
    if (!feedbackText.trim()) {
      toast.error("Rejection feedback description text is mandatory");
      return;
    }

    setLoading(true);
    const propertyId = rejectTarget._id;

    try {
      const res = await serverMutate(
        `/api/admin/properties/${propertyId}/status`,
        "PATCH",
        {
          status: "rejected",
          rejectionFeedback: feedbackText,
        },
      );
      if (res?.modifiedCount === 0) {
        toast.error("Failed to update property status");
        return;
      }

      toast.success("Property rejected and structural feedback submitted");
      setRejectTarget(null);
      router.refresh();
    } catch {
      toast.error("Failed to record structural changes");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full space-y-8 p-6 lg:p-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Manage Properties
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Moderation interface for rental listings asset verification loops.
        </p>
      </div>

      <hr className="border-gray-200" />

      <div className="overflow-x-auto rounded-xl border border-gray-100 bg-background shadow-sm">
        <table className="w-full border-collapse text-left text-sm text-gray-500">
          <thead className="bg-gray-50  uppercase text-gray-700 tracking-wider">
            <tr className="*:text-xs">
              <th className="px-6 py-4 font-semibold">Asset Details</th>
              <th className="px-6 py-4 font-semibold">Owner Profile</th>
              <th className="px-6 py-4 font-semibold">Pricing Structure</th>
              <th className="px-6 py-4 font-semibold">Status Parameters</th>
              <th className="px-6 py-4 font-semibold text-right">
                Moderation Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {visibleItems.map((item) => {
              const itemId = item.propertyId || item._id;
              const statusNormalized = item.status?.toLowerCase() || "pending";
              return (
                <tr key={itemId} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    <div className="flex items-center gap-3">
                      {item.images?.[0] && (
                        <Image
                          height={100}
                          width={100}
                          src={item.images[0]}
                          alt=""
                          className="h-12 w-12 rounded-lg object-cover bg-gray-100"
                          unoptimized
                        />
                      )}
                      <div>
                        <div className="font-bold text-gray-900">
                          {item.title}
                        </div>
                        <div className="text-xs text-gray-400">
                          {item.location}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-gray-900 font-medium">
                      {item.ownerInfo?.name || "Unknown Owner"}
                    </div>
                    <div className="text-xs text-gray-400">
                      {item.ownerInfo?.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-900">
                    ${item.rent}{" "}
                    <span className="text-xs font-normal text-gray-400">
                      / {item.rentType}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium capitalize
                      ${statusNormalized === "approved" ? "bg-emerald-50 text-emerald-700" : ""}
                      ${statusNormalized === "pending" ? "bg-amber-50 text-amber-700" : ""}
                      ${statusNormalized === "rejected" ? "bg-red-50 text-red-700" : ""}
                    `}>
                      {statusNormalized}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex flex-wrap justify-end gap-2">
                      {statusNormalized === "pending" && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => handleApprove(item)}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white h-8 px-2.5">
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => openRejectModal(item)}
                            className="h-8 px-2.5">
                            <X className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openUpdateModal(item)}
                        className="h-8 px-2.5">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => openDeleteConfirm(item)}
                        className="h-8 px-2.5">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    {statusNormalized === "rejected" &&
                    item.rejectionFeedback ? (
                      <div
                        className="mt-2 text-xs text-red-500 max-w-xs ml-auto line-clamp-1 italic"
                        title={item.rejectionFeedback}>
                        &quot;{item.rejectionFeedback}&quot;
                      </div>
                    ) : null}
                  </td>
                </tr>
              );
            })}
            {filteredItems.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-10 text-gray-400">
                  No active properties require moderation.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-gray-500">
          Showing{" "}
          {filteredItems.length === 0 ? 0 : (currentPage - 1) * pageSize + 1} -{" "}
          {Math.min(filteredItems.length, currentPage * pageSize)} of{" "}
          {filteredItems.length} properties
        </div>
        <div className="flex items-center justify-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              setPage((prev) => Math.max(1, Math.min(totalPages, prev - 1)))
            }
            disabled={currentPage <= 1}>
            Prev
          </Button>
          <span className="rounded-md border px-3 py-2 text-sm text-gray-700">
            {currentPage} / {totalPages}
          </span>
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              setPage((prev) => Math.min(totalPages, Math.max(1, prev + 1)))
            }
            disabled={currentPage >= totalPages}>
            Next
          </Button>
        </div>
      </div>

      <EditPropertyModal
        isOpen={isEditOpen}
        onClose={closeUpdateModal}
        property={editingProperty}
        onUpdate={handleEditSuccess}
        apiPath="/api/admin/properties"
      />

      <DeleteConfirmation
        open={confirmDeleteOpen}
        onOpenChange={setConfirmDeleteOpen}
        title="Delete Property Listing"
        description="This action will permanently remove the property from the platform."
        itemName={selectedDeleteTarget?.title}
        onConfirm={confirmDelete}
        confirmLabel="Delete"
        loading={deleteLoading}
      />

      {/* Rejection Feedback Entry Modal Frame */}
      <Dialog
        open={!!rejectTarget}
        onOpenChange={(open) => {
          if (!open) {
            setRejectTarget(null);
            setFeedbackText("");
          }
        }}>
        <DialogContent className="max-w-md bg-background">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <ShieldAlert className="h-5 w-5" />
              Reject Property Listing
            </DialogTitle>
            <DialogDescription>
              Specify the structural issues found with **{rejectTarget?.title}
              **. The owner will see this feedback.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 py-2">
            <label className="text-xs font-semibold text-gray-700 flex items-center gap-1">
              <MessageSquarePlus className="h-3.5 w-3.5 text-gray-400" />
              Rejection Reasons / Explanatory Notes
            </label>
            <textarea
              rows={4}
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              placeholder="e.g., Image documentation links are invalid, pricing bounds mismatch, or verification records insufficient..."
              className="w-full rounded-lg border border-gray-200 p-2.5 text-sm focus:border-red-500 focus:outline-none"
            />
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setRejectTarget(null)}
              disabled={loading}>
              Cancel Allocation
            </Button>
            <Button
              onClick={handleRejectSubmit}
              disabled={loading}
              className="bg-red-600 hover:bg-red-700 text-white">
              {loading ? "Recording..." : "Reject Listing"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
