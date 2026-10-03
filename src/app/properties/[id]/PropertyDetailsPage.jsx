"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  MapPin,
  BedDouble,
  Bath,
  Square,
  Sparkles,
  Shield,
  Clock,
  Heart,
  Star,
  Calendar,
  Phone,
  FileText,
  X,
} from "lucide-react";
import Image from "next/image";
import { serverMutate } from "@/lib/core/server";
import axios from "axios";
import { toast } from "sonner";
import { timeFormat } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function PropertyDetailsPage({
  propertyData,
  userId,
  userName,
}) {

  const router = useRouter();
  // Directly initializing state using property data arrays
  const [activeImage, setActiveImage] = useState(propertyData?.images?.[0]);
  const [isFavorite, setIsFavorite] = useState(
    propertyData?.isFavorite || false,
  );
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  // React Hook Form for validation matching system criteria
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    register: registerReview,
    handleSubmit: handleSubmitReview,
    reset: resetReview,
    formState: { errors: reviewErrors },
  } = useForm();

  // Dynamic review mock instances fulfilling standard display formatting rules
  const [reviews, setReviews] = useState(propertyData?.reviews || []);

  const handleAddToFavorites = async () => {
    if (!userId) {
      toast.info("Please log in to add properties to your favorites.");
      return;
    }

    const addToFavorite = await serverMutate(
      "/api/properties/favorites",
      "POST",
      {
        userId,
        propertyId: propertyData?._id,
      },
    );
    if (addToFavorite?.insertedId) {
      setIsFavorite(!isFavorite);
    }
  };

  const onBookingSubmit = async (data) => {
    setIsSubmittingBooking(true);
    try {
      // Pass the relevant property details directly instead of a priceId string
      const res = await axios.post("/api/checkout_sessions", {
        propertyId: propertyData?._id,
        userId,
        userName,
        title: propertyData?.title,
        rent: propertyData?.rent,
        rentType: propertyData?.rentType,
        description: propertyData?.description,
        image: propertyData?.images || propertyData?.images[0],
        location: propertyData?.location,
        propertyType: propertyData?.propertyType,
        ownerInfo: {
          name: propertyData?.ownerInfo?.name,
          email: propertyData?.ownerInfo?.email,
          ownerId: propertyData?.ownerInfo?.ownerId,
        },

        ...data,
      });

      const url = res?.data?.url;
      if (!url) {
        console.error("Stripe session URL missing", res.data);
        toast.error("Unable to start payment. Please try again.");
        return;
      }

      setBookingModalOpen(false);
      router.push(url);
    } catch (err) {
      console.error("Stripe Checkout Redirection Error:", err);
      toast.error(err.response?.data?.error || "Transaction routing failed.");
    } finally {
      setIsSubmittingBooking(false);
    }
  };

  const onReviewSubmit = async (data) => {
    if (!userId) {
      toast.error("Please log in to submit a review.");
      return;
    }

    setIsSubmittingReview(true);
    try {
      const response = await serverMutate("/api/properties/reviews", "POST", {
        propertyId: propertyData?._id,
        rating: reviewRating,
        comment: data.comment,
      });

      if (!response?.review) {
        throw new Error("Review submission failed.");
      }

      setReviews((current) => [response, ...current]);
      resetReview();
      setReviewRating(5);
    } catch (error) {
      console.error("Review submission error:", error);
      toast.error(error?.message || "Unable to submit review.");
    } finally {
      setIsSubmittingReview(false);
    }
  };
  useEffect(() => {
    if (!propertyData) {
      router.push("/unauthorized");
    }
  }, [propertyData, router]);
  if (!propertyData) {
    return (
      <div className="text-center py-24 text-sm text-gray-500">
        Property information unavailable.
      </div>
    );
  }

  return (
    <main className="min-h-screen py-12 px-4 md:px-8 max-w-7xl mx-auto text-gray-900">
      {/* Title Header Block */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="bg-indigo-50 text-primary text-xs font-bold tracking-wider uppercase px-2.5 py-1 rounded-md">
            {propertyData.propertyType}
          </span>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 mt-2">
            {propertyData.title}
          </h1>
          <div className="flex items-center gap-1.5 text-gray-500 text-xs mt-1.5 font-medium">
            <MapPin className="size-4 text-indigo-500" />
            <span>{propertyData.location}</span>
          </div>
        </div>

        <button
          onClick={handleAddToFavorites}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${isFavorite
            ? "bg-rose-50 border-rose-200 text-rose-600 shadow-xs"
            : "bg-background border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          disabled={isFavorite}>
          <Heart className={`size-4 ${isFavorite ? "fill-current" : ""}`} />
          {isFavorite ? "Added to Favorites" : "Save to Favorites"}
        </button>
      </div>

      {/* Grid Multi-Image Matrix Showcase UI */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
        <div className="lg:col-span-2 h-105 rounded-2xl overflow-hidden bg-gray-100 border border-gray-100 relative">
          {activeImage && (
            <Image
              fill
              src={activeImage}
              alt={propertyData.title}
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 66vw"
            />
          )}
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 h-fit lg:h-105">
          {propertyData.images?.map((img, i) => (
            <div
              key={i}
              onClick={() => setActiveImage(img)}
              className={`h-48 lg:h-50.5 rounded-2xl overflow-hidden bg-gray-100 border-2 cursor-pointer transition-all relative ${activeImage === img
                ? "border-primary"
                : "border-transparent opacity-80 hover:opacity-100"
                }`}>
              <Image
                src={img}
                alt={`Thumbnail preview ${i + 1}`}
                className="object-cover"
                fill
                sizes="(max-width: 1024px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Main Structural Information Columns Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Side Content Container Details */}
        <div className="lg:col-span-2 space-y-8">
          {/* Quick Specification Badges Row */}
          <div className="grid grid-cols-3 gap-4 bg-background border border-gray-100 rounded-2xl p-4 text-center shadow-xs">
            <div className="flex flex-col items-center justify-center p-2 border-r border-gray-50">
              <BedDouble className="size-5 text-indigo-500 mb-1" />
              <span className="text-xs text-gray-400 font-medium">
                Bedrooms
              </span>
              <span className="text-sm font-bold text-gray-900 mt-0.5">
                {propertyData.bedrooms}
              </span>
            </div>
            <div className="flex flex-col items-center justify-center p-2 border-r border-gray-50">
              <Bath className="size-5 text-indigo-500 mb-1" />
              <span className="text-xs text-gray-400 font-medium">
                Bathrooms
              </span>
              <span className="text-sm font-bold text-gray-900 mt-0.5">
                {propertyData.bathrooms}
              </span>
            </div>
            <div className="flex flex-col items-center justify-center p-2">
              <Square className="size-4 text-indigo-500 mb-1.5" />
              <span className="text-xs text-gray-400 font-medium">
                Property Size
              </span>
              <span className="text-sm font-bold text-gray-900 mt-0.5">
                {propertyData.propertySize}
              </span>
            </div>
          </div>

          {/* Description Block Layout Container */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400">
              About the Property
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed bg-background border border-gray-100 rounded-2xl p-5 shadow-xs">
              {propertyData.description}
            </p>
          </div>

          {/* Core Amenities Fieldset Selection Mapping */}
          {propertyData.amenities && propertyData.amenities.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400">
                Included Amenities
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {propertyData.amenities.map((amenity, index) => (
                  <div
                    key={index}
                    className="bg-background border border-gray-100 p-3.5 rounded-xl flex items-center gap-2.5 shadow-xs">
                    <div className="size-2 rounded-full bg-primary" />
                    <span className="text-xs font-semibold text-gray-700">
                      {amenity}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Extra Features Layout Content Zone */}
          {propertyData.extraFeatures && (
            <div className="space-y-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400">
                Extra Specifications
              </h3>
              <div className="bg-background border border-gray-100 p-5 rounded-2xl flex items-start gap-3 shadow-xs">
                <Sparkles className="size-5 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-xs text-gray-600 font-medium leading-relaxed">
                  {propertyData.extraFeatures}
                </p>
              </div>
            </div>
          )}

          {/* Reviews Rendering Section */}
          <div className="space-y-6 pt-4 border-t border-gray-100">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400">
              Reviews & Discussion
            </h3>

            <div className="bg-background border border-gray-100 rounded-2xl p-5 shadow-xs">
              <h4 className="text-sm font-semibold text-gray-900">
                Share your experience
              </h4>
              {userId ? (
                <form
                  onSubmit={handleSubmitReview(onReviewSubmit)}
                  className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                      Your Rating
                    </label>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((value) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => setReviewRating(value)}
                          className={`rounded-xl p-2 transition-colors ${value <= reviewRating
                            ? "bg-amber-100 text-amber-600"
                            : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                            }`}>
                          <Star className="size-4" />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                      Your Review
                    </label>
                    <textarea
                      rows={4}
                      {...registerReview("comment", {
                        required: "A review comment is required.",
                        minLength: {
                          value: 10,
                          message: "Review must be at least 10 characters.",
                        },
                      })}
                      className="w-full text-xs border border-gray-200 rounded-2xl p-3 bg-background outline-none focus:border-primary"
                      placeholder="Share your stay experience..."
                    />
                    {reviewErrors.comment && (
                      <p className="text-xs text-red-500 mt-1">
                        {reviewErrors.comment.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmittingReview}
                    className="inline-flex items-center justify-center rounded-2xl bg-primary px-4 py-2 text-xs font-bold uppercase text-white transition-colors disabled:bg-indigo-300">
                    {isSubmittingReview
                      ? "Submitting review..."
                      : "Submit Review"}
                  </button>
                </form>
              ) : (
                <p className="text-sm text-gray-500 mt-4">
                  Log in as a tenant to rate and review this property.
                </p>
              )}
            </div>

            <div className="space-y-4">
              {reviews.length === 0 ? (
                <p className="text-sm text-gray-500">
                  There are no reviews for this property yet.
                </p>
              ) : (
                reviews
                  .sort((a, b) => new Date(b.date) - new Date(a.date))
                  .map((rev, i) => (
                    <div
                      key={i}
                      className="bg-background border border-gray-100 p-5 rounded-2xl shadow-xs space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h5 className="text-xs font-bold text-gray-900">
                            {rev.reviewerName}
                          </h5>
                          <span className="text-xs text-gray-400 font-medium">
                            {rev.reviewerEmail}
                            {rev.reviewerEmail ? " • " : ""}
                            {timeFormat(rev.date)}
                          </span>
                        </div>
                        <div className="flex items-center gap-0.5 text-amber-400">
                          {[...Array(rev.rating)].map((_, idx) => (
                            <Star key={idx} className="size-3.5 fill-current" />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed font-medium">
                        {rev.comment}
                      </p>
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>

        {/* Right Side Control Sidebar Container Sticky Card Layout */}
        <div className="space-y-6 lg:sticky lg:top-20">
          <div className="bg-background border border-gray-100 rounded-3xl p-6 shadow-sm space-y-4">
            {/* Dynamic Rent Price Module */}
            <div className="flex justify-between items-baseline border-b border-gray-50 pb-4">
              <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
                Pricing Context
              </span>
              <div className="text-right">
                <span className="text-2xl font-black text-gray-900">
                  ${propertyData.rent}
                </span>
                <span className="text-xs text-gray-400 font-bold ml-1">
                  / {propertyData.rentType}
                </span>
              </div>
            </div>

            {/* Verification Badges Overview Wrapper */}
            <div className="space-y-2.5 text-xs text-gray-500 font-semibold bg-gray-50/50 p-3.5 rounded-xl border border-gray-100/50">
              <div className="flex items-center gap-2">
                <Shield className="size-3.5 text-emerald-500" />
                <span>Verified Clean HavenStay Property Listing </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="size-3.5 text-indigo-500" />
                <span>Instant Confirmation Booking Flow </span>
              </div>
            </div>

            {/* Primary Action Button Execution Zone */}
            <button
              onClick={() => setBookingModalOpen(true)}
              className="w-full bg-primary hover:bg-primary/80 text-white font-bold text-xs py-3 rounded-xl transition-colors tracking-wider uppercase cursor-pointer">
              Book Property Now
            </button>
          </div>

          {/* Owner Accountability Contact Box */}
          {propertyData.ownerInfo && (
            <div className="bg-background border border-gray-100 rounded-2xl p-4 shadow-xs flex items-center gap-3">
              <div className="size-9 rounded-full bg-indigo-50 flex items-center justify-center font-black text-xs text-primary">
                {propertyData.ownerInfo.name?.charAt(0) || "O"}
              </div>
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                  Listed By Owner
                </p>
                <h4 className="text-xs font-bold text-gray-900">
                  {propertyData.ownerInfo.name}
                </h4>
                <p className="text-xs text-gray-400 font-medium">
                  {propertyData.ownerInfo.email}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Booking Form Dialog Modal Context */}
      {bookingModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-background rounded-2xl w-full max-w-md shadow-2xl p-6 border border-gray-100 relative space-y-4">
            {/* Modal Exit Header Action Row */}
            <div className="flex justify-between items-center pb-2 border-b border-gray-50">
              <div>
                <h3 className="text-sm font-bold text-gray-900 tracking-wide">
                  Confirm Booking Reservation
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  {propertyData.title}
                </p>
              </div>
              <button
                onClick={() => setBookingModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer p-1 rounded-lg">
                <X className="size-4" />
              </button>
            </div>

            {/* Dynamic Form Controller Hook Integration */}
            <form
              onSubmit={handleSubmit(onBookingSubmit)}
              className="space-y-4">
              {/* Move-in date operational field input */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                  Move-In Date
                </label>
                <div className="relative flex items-center">
                  <Calendar className="absolute left-3 text-gray-400 size-4" />
                  <input
                    type="date"
                    {...register("moveInDate", {
                      required: "Move-in selection date is required",
                    })}
                    className="w-full text-xs pl-10 pr-4 py-2.5 bg-background border border-gray-200 rounded-xl outline-none focus:border-primary"
                  />
                </div>
                {errors.moveInDate && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.moveInDate.message}
                  </p>
                )}
              </div>

              {/* Contact number data input field line item */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                  Contact Phone Number
                </label>
                <div className="relative flex items-center">
                  <Phone className="absolute left-3 text-gray-400 size-4" />
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    {...register("contactNumber", {
                      required: "Contact cellular identity is required",
                    })}
                    className="w-full text-xs pl-10 pr-4 py-2.5 bg-background border border-gray-200 rounded-xl outline-none focus:border-primary"
                  />
                </div>
                {errors.contactNumber && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.contactNumber.message}
                  </p>
                )}
              </div>

              {/* Extra details textbox area element */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                  Additional Booking Notes
                </label>
                <div className="relative flex items-start">
                  <FileText className="absolute left-3 top-3 text-gray-400 size-4" />
                  <textarea
                    rows={3}
                    placeholder="Enter any specific arrangement parameters requested..."
                    {...register("additionalNotes")}
                    className="w-full text-xs pl-10 pr-4 py-2.5 bg-background border border-gray-200 rounded-xl outline-none focus:border-primary resize-none"
                  />
                </div>
              </div>

              {/* Transaction Processing CTA Button Action */}
              <button
                type="submit"
                disabled={isSubmittingBooking}
                className="w-full bg-primary hover:bg-primary/80 disabled:bg-indigo-300 text-white font-bold text-xs py-2.5 rounded-xl tracking-wider uppercase transition-colors pt-3 cursor-pointer">
                {isSubmittingBooking
                  ? "Routing Connection..."
                  : "Proceed to Stripe Payment Gateway →"}
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
