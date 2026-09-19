"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { authClient } from "@/lib/auth-client"; // Adjust path based on your setup
import { User, Mail, Lock, Upload, Eye, EyeOff } from "lucide-react";
import GoogleAuthButton from "@/components/ui/GoogleAuthButton";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import axios from "axios";

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      photo: "",
      password: "",
      agreeTerms: false,
    },
  });

  const photoUrlValue = watch("photo");

  // Handle local image selection and mock/direct upload (or convert to base64 / host via ImgBB)
  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Create immediate local preview
    setPhotoPreview(URL.createObjectURL(file));
    setUploadingPhoto(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGEBB_API}`,
        formData,
      );
      setValue("photo", res.data.data.url);

      // fallback placeholder/direct text mapping if keeping local reference for now
      setValue("photo", URL.createObjectURL(file));
    } catch (err) {
      setError("Failed to upload image profile photo.");
    } finally {
      setUploadingPhoto(false);
    }
  };

  const onSubmit = async (values) => {
    if (!values.agreeTerms) {
      setError("You must agree to the Terms of Service and Privacy Policy.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const { data, error: authError } = await authClient.signUp.email({
        email: values.email,
        password: values.password,
        name: values.name,
        image: values.photo, // Maps natively to better-auth profile image schema
        role: "tenant", // Explicitly defaulting account creation to Tenant role
      });

      if (authError) {
        setError(authError.message || "Registration failed. Please try again.");
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      setError("An unexpected error occurred during signup.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center bg-[#f0f3ff] py-12 px-4">
      {/* Header Info */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-primary tracking-wide">
          HavenStay
        </h1>
        <p className="text-xs text-gray-500 mt-1">Join HavenStay</p>
        <p className="text-[11px] text-gray-400">
          Start your journey toward a perfect stay.
        </p>
      </div>

      {/* Register Container */}
      <div className="w-full max-w-md bg-background rounded-2xl shadow-xs border border-gray-100 p-8">
        {error && (
          <div className="mb-4 text-xs bg-red-50 text-red-600 p-3 rounded-lg border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Full Name input field */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Full Name
            </label>
            <div className="relative flex items-center">
              <User className="absolute left-3 text-gray-400 size-4" />
              <input
                {...register("name", { required: "Full name is required" })}
                type="text"
                placeholder="John Doe"
                className={`w-full text-sm pl-10 pr-4 py-2.5 bg-background border rounded-xl outline-none focus:border-primary transition-colors text-gray-900 ${
                  errors.name
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-200"
                }`}
              />
            </div>
            {errors.name && (
              <p className="text-[11px] text-red-500 mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email Address input field */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Email Address
            </label>
            <div className="relative flex items-center">
              <Mail className="absolute left-3 text-gray-400 size-4" />
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-0.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                type="email"
                placeholder="john@example.com"
                className={`w-full text-sm pl-10 pr-4 py-2.5 bg-background border rounded-xl outline-none focus:border-primary transition-colors text-gray-900 ${
                  errors.email
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-200"
                }`}
              />
            </div>
            {errors.email && (
              <p className="text-[11px] text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Profile Photo upload layout zone */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Profile Photo
            </label>
            <label className="group relative flex flex-col items-center justify-center border border-dashed border-gray-200 rounded-xl p-4 bg-gray-50/50 hover:bg-gray-50 transition-colors cursor-pointer text-center">
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />
              {photoPreview ? (
                <div className="relative size-16 rounded-full overflow-hidden border border-gray-100">
                  <Image
                    src={photoPreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    width={300}
                    height={300}
                  />
                </div>
              ) : (
                <>
                  <Upload className="text-gray-400 size-5 mb-1.5 group-hover:text-primary transition-colors" />
                  <p className="text-xs text-gray-600 font-medium">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-[10px] text-gray-400 mt-0.5">
                    SVG, PNG, JPG (MAX. 800x400px)
                  </p>
                </>
              )}
              {uploadingPhoto && (
                <div className="absolute inset-0 bg-background/80 flex items-center justify-center text-xs text-gray-500 rounded-xl">
                  Uploading...
                </div>
              )}
            </label>
          </div>

          {/* Password input field */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Password
            </label>
            <div className="relative flex items-center">
              <Lock className="absolute left-3 text-gray-400 size-4" />
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/,
                    message:
                      "Password must include uppercase, lowercase, number, and special character",
                  },
                })}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className={`w-full text-sm pl-10 pr-10 py-2.5 bg-background border rounded-xl outline-none focus:border-primary transition-colors text-gray-900 ${
                  errors.password
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-200"
                }`}
              />
              <Button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-gray-400 hover:text-gray-600 transition-colors">
                {showPassword ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </Button>
            </div>
            {errors.password && (
              <p className="text-[11px] text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
            <p className="text-[10px] italic text-gray-400 mt-1.5">
              Note: All new accounts default to Tenant role.
            </p>
          </div>

          {/* Terms Agreement Checkbox */}
          <div className="flex items-center gap-2 pt-1">
            <input
              {...register("agreeTerms")}
              type="checkbox"
              id="agreeTerms"
              className="mt-0.5 size-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <label
              htmlFor="agreeTerms"
              className="text-xs text-gray-500 select-none cursor-pointer leading-tight">
              I agree to the{" "}
              <Link href="/terms" className="text-primary hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
              .
            </label>
          </div>

          {/* Sign Up Submit Action Button */}
          <Button
            type="submit"
            disabled={loading || uploadingPhoto}
            className="w-full h-fit bg-primary hover:bg-primary/80 disabled:bg-indigo-400 text-white font-medium text-sm py-2.5 rounded-xl transition-colors mt-2 cursor-pointer">
            {loading ? "Creating Account..." : "Sign Up"}
          </Button>
        </form>

        {/* Separator UI Label */}
        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-100"></div>
          </div>
          <span className="relative bg-background px-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
            Or register with
          </span>
        </div>

        {/* Social Authentication Oauth Grid */}
        <GoogleAuthButton />
      </div>

      {/* Alternate Login Link */}
      <p className="text-xs text-gray-500 mt-6">
        Already have an account?{" "}
        <Link href="/login" className="font-bold text-primary hover:underline">
          Login
        </Link>
      </p>
    </main>
  );
}
