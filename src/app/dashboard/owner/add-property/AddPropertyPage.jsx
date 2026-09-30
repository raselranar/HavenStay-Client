"use client";

import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { PlusCircle, Loader2, ImagePlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { serverMutate } from "@/lib/core/server";
import { toast } from "sonner";

export default function AddPropertyPage({ ownerData }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      propertyType: "Apartment",
      rentType: "Monthly",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setMessage({ type: "", text: "" });

    // Process raw multi-image text values into array formats directly
    const imageUrls = data.images
      .split("\n")
      .map((url) => url.trim())
      .filter((url) => url !== "");

    const payload = {
      ...data,
      amenities: data.amenities.split(","),
      images: imageUrls,
      ownerInfo: {
        ownerId: ownerData.id,
        ownerName: ownerData.name,
        ownerEmail: ownerData.email,
      },
      status: "pending",
    };

    try {
      const response = await serverMutate(
        "/api/owner/properties",
        "POST",
        payload,
      );

      if (response?.insertedId) {
        setMessage({
          type: "success",
          text: "Listing added successfully! Status is currently Pending Admin Review.",
        });
        toast.success("New Property added successfully");
        reset();
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "Failed to create property profile.",
      });
      toast.error("Failed to create property profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full space-y-8 mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Add New Property
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          List an asset to begin attracting verified tenant occupants.
        </p>
      </div>

      <hr className="border-gray-200" />

      {message.text && (
        <div
          className={`p-4 rounded-lg text-sm ${message.type === "success" ? "bg-emerald-50 text-emerald-800" : "bg-red-50 text-red-800"}`}>
          {message.text}
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 bg-background p-6 rounded-xl border border-gray-100 shadow-sm">
        {/* Core Info */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Property Title
            </label>
            <Input
              type="text"
              {...register("title", { required: "Title is required" })}
              aria-invalid={errors.title ? true : false}
              className="mt-1"
              placeholder="Modern Luxury Villa"
            />
            {errors.title && (
              <p className="text-xs text-red-500 mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Location Address
            </label>
            <Input
              type="text"
              {...register("location", { required: "Location is required" })}
              aria-invalid={errors.location ? true : false}
              className="mt-1"
              placeholder="e.g., Manhattan, NY"
            />
            {errors.location && (
              <p className="text-xs text-red-500 mt-1">
                {errors.location.message}
              </p>
            )}
          </div>
        </div>

        {/* Financial & Formulations */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Property Type
            </label>
            <Controller
              name="propertyType"
              control={control}
              rules={{ required: "Property type is required" }}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  aria-invalid={errors.propertyType ? true : false}>
                  <SelectTrigger className="mt-1 w-full">
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Apartment">Apartment</SelectItem>
                    <SelectItem value="Villa">Villa</SelectItem>
                    <SelectItem value="Penthouse">Penthouse</SelectItem>
                    <SelectItem value="Cabin">Cabin</SelectItem>
                    <SelectItem value="Studio">Studio</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.propertyType && (
              <p className="text-xs text-red-500 mt-1">
                {errors.propertyType.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Rent Price ($)
            </label>
            <Input
              type="number"
              step="any"
              {...register("rent", { required: "Price is required", min: 1 })}
              aria-invalid={errors.rent ? true : false}
              className="mt-1"
              placeholder="2500"
            />
            {errors.rent && (
              <p className="text-xs text-red-500 mt-1">{errors.rent.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Rent Structural Window
            </label>
            <Controller
              name="rentType"
              control={control}
              rules={{ required: "Rent type is required" }}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  aria-invalid={errors.rentType ? true : false}>
                  <SelectTrigger className="mt-1 w-full">
                    <SelectValue placeholder="Select rent type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Monthly">Monthly</SelectItem>
                    <SelectItem value="Weekly">Weekly</SelectItem>
                    <SelectItem value="Daily">Daily</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.rentType && (
              <p className="text-xs text-red-500 mt-1">
                {errors.rentType.message}
              </p>
            )}
          </div>
        </div>

        {/* Structural Metrics */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Bedrooms
            </label>
            <Input
              type="number"
              {...register("bedrooms", { required: true, min: 0 })}
              aria-invalid={errors.bedrooms ? true : false}
              className="mt-1"
              placeholder="3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Bathrooms
            </label>
            <Input
              type="number"
              {...register("bathrooms", { required: true, min: 0 })}
              aria-invalid={errors.bathrooms ? true : false}
              className="mt-1"
              placeholder="2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Property Size (sq ft)
            </label>
            <Input
              type="number"
              {...register("propertySize", { required: true, min: 1 })}
              aria-invalid={errors.propertySize ? true : false}
              className="mt-1"
              placeholder="1800"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Detailed Description
          </label>
          <textarea
            rows={4}
            {...register("description", {
              required: "Description is required",
            })}
            className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm focus:border-emerald-500 focus:outline-none"
            placeholder="Provide context regarding neighborhood features, security details, and space allocations..."></textarea>
          {errors.description && (
            <p className="text-xs text-red-500 mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Amenities & Extras */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Amenities (Comma-separated)
            </label>
            <Input
              type="text"
              {...register("amenities", {
                required: "Provide at least one amenity",
              })}
              aria-invalid={errors.amenities ? true : false}
              className="mt-1"
              placeholder="Pool, Wifi, AC, Gym, Private Parking"
            />
            {errors.amenities && (
              <p className="text-xs text-red-500 mt-1">
                {errors.amenities.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Extra Features
            </label>
            <Input
              type="text"
              {...register("extraFeatures")}
              aria-invalid={errors.extraFeatures ? true : false}
              className="mt-1"
              placeholder="e.g., Pet friendly, Rooftop Access"
            />
          </div>
        </div>

        {/* Images Submission Handling */}
        <div>
          <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
            <ImagePlus className="h-4 w-4 text-gray-400" />
            Property Images URLs (One URL per line)
          </label>
          <textarea
            rows={3}
            {...register("images", {
              required: "Provide at least one direct asset image URL link",
            })}
            className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm focus:border-emerald-500 focus:outline-none font-mono"
            placeholder="https://images.unsplash.com/photo-1...&#10;https://images.unsplash.com/photo-2..."></textarea>
          {errors.images && (
            <p className="text-xs text-red-500 mt-1">{errors.images.message}</p>
          )}
        </div>

        {/* Submit Execution Action */}
        <div className="pt-2 w-full">
          <Button type="submit" size="lg" disabled={loading} className="">
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <PlusCircle className="h-4 w-4" />
                Create & List Property
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
