// src/app/login/page.js
"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { authClient } from "@/lib/auth-client";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import GoogleAuthButton from "@/components/ui/GoogleAuthButton";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Initialize React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  // Handle Form Submission
  const onSubmit = async (values) => {
    setError("");
    setLoading(true);

    try {
      const { data, error: authError } = await authClient.signIn.email({
        email: values.email,
        password: values.password,
        rememberMe: !values.rememberMe,
      });

      if (authError) {
        toast.error(
          authError.message || "Login failed. Please check your credentials.",
        );
        setError(authError.message || "Invalid credentials. Please try again.");
      } else {
        toast.success("Login successful. Redirecting...");
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center bg-[#f0f3ff] p-4">
      {/* Top Brand Logo */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-primary tracking-wide">
          HavenStay
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Welcome back. Secure access to your premium stays.
        </p>
      </div>

      {/* Main Login Box */}
      <div className="w-full max-w-md bg-background rounded-2xl shadow-xs border border-gray-100 p-8">
        <h2 className="text-lg font-bold text-gray-900 mb-1">
          Login to Account
        </h2>
        <p className="text-xs text-gray-500 mb-6">
          Enter your credentials to manage your bookings.
        </p>
        {error && (
          <div className="mb-4 text-xs bg-red-50 text-red-600 p-3 rounded-lg border border-red-100">
            {error}
          </div>
        )}
        {/* Credentials Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email input field */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Email Address
            </label>
            <div className="relative flex items-center">
              <Mail className="absolute left-3 text-gray-400 size-4" />
              <input
                {...register("email", {
                  required: "Email address is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                type="email"
                placeholder="name@company.com"
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

          {/* Password input field */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-semibold text-gray-700">
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-[11px] font-bold text-primary hover:underline">
                Forgot Password?
              </Link>
            </div>
            <div className="relative flex items-center">
              <Lock className="absolute left-3 text-gray-400 size-4" />
              <input
                {...register("password", { required: "Password is required" })}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className={`w-full text-sm pl-10 pr-10 py-2.5 bg-background border rounded-xl outline-none focus:border-primary transition-colors text-gray-900 ${
                  errors.password
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-200"
                }`}
              />
              <Button
                type="Button"
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
          </div>

          {/* Remember me option */}
          <div className="flex items-center gap-2 pt-1">
            <input
              {...register("rememberMe")}
              type="checkbox"
              id="remember"
              className="size-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <label
              htmlFor="remember"
              className="text-xs text-gray-500 select-none cursor-pointer">
              Remember me for 30 days
            </label>
          </div>

          {/* Action Button */}
          <div className="">
            <Button
              type="submit"
              variant="lg"
              disabled={loading}
              className="w-full h-fit bg-primary hover:bg-primary/80 disabled:bg-indigo-400 text-white font-medium text-sm py-2.5 rounded-xl transition-colors mt-2 cursor-pointer">
              {loading ? "Logging in..." : "Login"}
            </Button>
          </div>
        </form>
        {/* Separator UI element */}
        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-100"></div>
          </div>
          <span className="relative bg-background px-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
            Or continue with
          </span>
        </div>
        <GoogleAuthButton />{" "}
      </div>

      {/* Alternate action link */}
      <p className="text-xs text-gray-500 mt-6">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-bold text-primary hover:underline">
          Register
        </Link>
      </p>
    </main>
  );
}
