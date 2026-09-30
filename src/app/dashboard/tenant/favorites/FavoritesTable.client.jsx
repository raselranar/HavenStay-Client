"use client";

import React, { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { serverMutate } from "@/lib/core/server";
import { toast } from "sonner";

export default function FavoritesTable({ initialFavorites = [], userId }) {
  const [favorites, setFavorites] = useState(initialFavorites || []);
  const [loadingId, setLoadingId] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedFavorite, setSelectedFavorite] = useState(null);

  const openConfirm = (item) => {
    setSelectedFavorite(item);
    setConfirmOpen(true);
  };

  const handleRemove = async () => {
    const item = selectedFavorite;
    if (!item) return;
    const id = item._id;
    setLoadingId(id);

    try {
      // const res = await fetch("/api/properties/favorites", {
      //   method: "DELETE",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ userId, propertyId: id }),
      // });
      const res = await serverMutate("/api/properties/favorites", "DELETE", {
        _id: id,
      });
      if (res.deletedCount) {

        setFavorites((prev) => prev.filter((f) => f._id !== id));
        setConfirmOpen(false);
        setSelectedFavorite(null);
        toast.success("Favorite removed");
      } else {
        toast.error("Failed to remove favorite");
      }
    } catch (e) {
      console.error(e);
      toast.error("Failed to remove favorite");
    } finally {
      setLoadingId(null);
    }
  };

  if (!favorites || favorites.length === 0) {
    return (
      <div className="py-20 text-center border border-gray-100 rounded-2xl bg-background">
        <p className="text-sm text-gray-500 font-medium">
          You have no favorites yet.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-background border border-gray-100 rounded-2xl shadow-xs">
      <table className="min-w-full text-left text-xs border-collapse">
        <thead>
          <tr className="border-b border-gray-100 text-gray-500 font-semibold bg-gray-50/50">
            <th className="px-6 py-4 font-semibold text-gray-600">Title</th>
            <th className="px-6 py-4 font-semibold text-gray-600">Type</th>
            <th className="px-6 py-4 font-semibold text-gray-600">Location</th>
            <th className="px-6 py-4 font-semibold text-gray-600">Price</th>
            <th className="px-6 py-4 font-semibold text-gray-600">Bathrooms</th>
            <th className="px-6 py-4 font-semibold text-gray-600">Bedrooms</th>
            <th className="px-6 py-4 font-semibold text-gray-600 text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 text-gray-700 font-medium">
          {favorites.map((item) => {
            const prop = item.property || item;
            const id = item._id;
            // Match fields with table structure safely
            const displayTitle = prop.title || "—";
            const displayType = prop.type || "—";
            const displayLocation = prop.location || "—";
            const displayPrice = prop.price || "—";
            const displayBaths = prop.baths ?? "—";
            const displayBeds = prop.beds ?? "—";

            return (
              <tr
                key={item._id}
                className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap">
                  {displayTitle}
                </td>
                <td className="px-6 py-4 text-gray-600 whitespace-nowrap">
                  {displayType}
                </td>
                <td className="px-6 py-4 text-gray-600 whitespace-nowrap">
                  {displayLocation}
                </td>
                <td className="px-6 py-4 text-gray-900 font-semibold whitespace-nowrap">
                  {displayPrice}
                </td>
                <td className="px-6 py-4 text-gray-600 whitespace-nowrap">
                  {displayBaths}
                </td>
                <td className="px-6 py-4 text-gray-600 whitespace-nowrap">
                  {displayBeds}
                </td>
                <td className="px-6 py-4 text-center whitespace-nowrap">
                  <button
                    onClick={() => openConfirm(item)}
                    disabled={loadingId === id}
                    title="Remove item"
                    className="inline-flex items-center justify-center text-red-500 hover:text-red-700 p-1 rounded-md hover:bg-red-50 transition-colors cursor-pointer disabled:opacity-50">
                    {loadingId === id ? (
                      <Loader2 className="size-4 animate-spin text-red-500" />
                    ) : (
                      <Trash2 className="size-4" />
                    )}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove favorite</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove this property from your favorites?
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <p className="text-sm text-slate-700">
              {selectedFavorite?.property?.title ||
                selectedFavorite?.title ||
                "Selected property"}
            </p>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              type="button"
              variant="destructive"
              onClick={handleRemove}
              disabled={loadingId === selectedFavorite?._id}>
              {loadingId === selectedFavorite?._id
                ? "Removing…"
                : "Remove Favorite"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
