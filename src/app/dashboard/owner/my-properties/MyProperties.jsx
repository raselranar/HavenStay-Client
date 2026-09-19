"use client";

import React, { useState } from "react";
import axios from "axios";
import { Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import EditPropertyModal from "@/components/modals/edit-property-modal";
import { useRouter } from "next/navigation";
import DeleteConfirmation from "@/components/ui/delete-confirmation";
import { serverMutate } from "@/lib/core/server";
import { toast } from "sonner";

export default function MyPropertiesPage({ ownerProperties = [] }) {
  console.log(ownerProperties);
  const [editingProperty, setEditingProperty] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const router = useRouter();
  // edit handler
  const handleEditClick = (item) => {
    setEditingProperty(item);
    setIsEditOpen(true);
  };
  const handleUpdateSuccess = () => {
    router.refresh();
    return;
  };

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedToDelete, setSelectedToDelete] = useState(null);
  const [loadingId, setLoadingId] = useState(null);

  const handleDelete = (item) => {
    setSelectedToDelete(item);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    const item = selectedToDelete;
    if (!item) return;
    const id = item._id;
    console.log(id);
    setLoadingId(id);

    try {
      const res = await serverMutate("/api/owner/properties", "DELETE", {
        id: id,
      });
      if (res.deletedCount !== 0) {
        // If deletion was successful, refresh the page or update state
        toast.success("Item deleted successfully");
        router.refresh();
        setConfirmOpen(false);
        setSelectedToDelete(null);
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting item.");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="w-full space-y-8 sm:p-6 lg:p-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          My Properties
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Manage your real estate listings, status parameters, and review
          cycles.
        </p>
      </div>

      <hr className="border-gray-200" />

      <div className="overflow-x-auto rounded-xl border border-gray-100 bg-background shadow-sm">
        <table className="w-full border-collapse text-left text-xs sm:text-sm text-gray-500">
          <thead className="bg-gray-50 uppercase text-gray-700 tracking-wider">
            <tr className="*:text-xs sm:*:text-sm">
              <th className="px-3 sm:px-6 py-3 sm:py-4 font-semibold">
                Property
              </th>
              <th className="hidden sm:table-cell px-3 sm:px-6 py-3 sm:py-4 font-semibold">
                Type
              </th>
              <th className="hidden md:table-cell px-3 sm:px-6 py-3 sm:py-4 font-semibold">
                Location
              </th>
              <th className="hidden lg:table-cell px-3 sm:px-6 py-3 sm:py-4 font-semibold">
                Rent Price
              </th>
              <th className="hidden md:table-cell px-3 sm:px-6 py-3 sm:py-4 font-semibold">
                Status
              </th>
              <th className="px-3 sm:px-6 py-3 sm:py-4 font-semibold text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {ownerProperties?.map((item) => {
              const itemId = item.propertyId || item._id;
              // Handle case-insensitive status matching securely
              const normalizedStatus = item.status?.toLowerCase() || "pending";

              return (
                <tr key={itemId} className="hover:bg-gray-50 transition-colors">
                  <td className="px-3 sm:px-6 py-3 sm:py-4 font-medium text-gray-900">
                    <div className="flex items-center gap-2 sm:gap-3">
                      {item.images?.[0] && (
                        <Image
                          height={120}
                          width={120}
                          src={item.images[0]}
                          alt=""
                          className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg object-cover bg-gray-100"
                          unoptimized
                        />
                      )}
                      <div>
                        <div className="font-bold text-gray-900 text-xs sm:text-sm">
                          {item.title}
                        </div>
                        <div className="text-xs text-gray-400 sm:hidden">
                          {item.location}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="hidden sm:table-cell px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">
                    {item.propertyType}
                  </td>
                  <td className="hidden md:table-cell px-3 sm:px-6 py-3 sm:py-4 text-gray-700 text-xs sm:text-sm">
                    {item.location}
                  </td>
                  <td className="hidden lg:table-cell px-3 sm:px-6 py-3 sm:py-4 font-semibold text-gray-900 text-xs sm:text-sm">
                    ${item.rent} /{" "}
                    <span className="text-xs text-gray-400 font-normal">
                      {item.rentType}
                    </span>
                  </td>
                  <td className="hidden md:table-cell px-3 sm:px-6 py-3 sm:py-4">
                    ${item.rent} /{" "}
                    <span className="text-xs text-gray-400 font-normal">
                      {item.rentType}
                    </span>
                  </td>
                  <td className="hidden md:table-cell px-3 sm:px-6 py-3 sm:py-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium capitalize
                        ${normalizedStatus === "approved" ? "bg-emerald-50 text-emerald-700" : ""}
                        ${normalizedStatus === "pending" ? "bg-amber-50 text-amber-700" : ""}
                        ${normalizedStatus === "rejected" ? "bg-red-50 text-red-700" : ""}
                      `}>
                        {normalizedStatus}
                      </span>
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-right">
                    <div className="flex justify-end gap-2 sm:gap-3">
                      <Button onClick={() => handleEditClick(item)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => handleDelete(item)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {ownerProperties?.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-10 text-gray-400 text-xs sm:text-sm">
                  No properties listed yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <DeleteConfirmation
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Delete listing"
        description="This will permanently delete your listing. This action cannot be undone."
        itemName={selectedToDelete?.title}
        onConfirm={confirmDelete}
        loading={loadingId === selectedToDelete?._id}
      />
      <EditPropertyModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        property={editingProperty}
        onUpdate={handleUpdateSuccess}
      />
    </div>
  );
}
