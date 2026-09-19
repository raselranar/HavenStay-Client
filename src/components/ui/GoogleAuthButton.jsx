"use client";
import { authClient } from "@/lib/auth-client";
import { Button } from "./button";

const GoogleAuthButton = () => {
  const handleGoogleLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
      });
    } catch (err) {
      console.error("Google login failed:", err);
    }
  };

  return (
    <Button
      type="button"
      variant="lg"
      onClick={handleGoogleLogin}
      className="w-full h-fit border border-gray-200 bg-background hover:bg-gray-50 text-gray-700 font-medium text-sm py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer">
      <svg className="size-4" viewBox="0 0 24 24" width="16" height="16">
        <path
          fill="#EA4335"
          d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115Z"
        />
        <path
          fill="#4285F4"
          d="M23.455 12.273c0-.818-.073-1.609-.209-2.364H12v4.477h6.432a5.505 5.505 0 0 1-2.386 3.614v3.009h3.836c2.245-2.073 3.573-5.114 3.573-8.736Z"
        />
        <path
          fill="#FBBC05"
          d="M5.266 14.235A7.115 7.115 0 0 1 4.909 12c0-.79.132-1.555.357-2.265L1.24 6.62A11.934 11.934 0 0 0 0 12c0 1.927.455 3.745 1.255 5.373l4.011-3.138Z"
        />
        <path
          fill="#34A853"
          d="M12 24c3.24 0 5.955-1.073 7.936-2.918l-3.836-3.009c-1.064.714-2.427 1.141-4.1 1.141-3.164 0-5.845-2.136-6.805-5.018L1.184 17.34A11.944 11.944 0 0 0 12 24Z"
        />
      </svg>
      Sign in with Google
    </Button>
  );
};
export default GoogleAuthButton;
