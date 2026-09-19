"use client";
import Link from "next/link";

export default function GlobalError({ error, reset }) {
  // Log to console for diagnostics
  console.error("Global Error:", error);

  return (
    <main className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="max-w-xl w-full bg-background rounded-2xl shadow-md p-8 text-center">
        <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
        <p className="text-sm text-gray-500 mb-6">
          An unexpected error occurred. Try refreshing the page or return home.
        </p>

        <div className="mb-4">
          <button
            onClick={() => reset?.()}
            className="px-4 py-2 mr-3 rounded-lg bg-primary text-white font-medium">
            Retry
          </button>
          <Link
            href="/"
            className="px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-700">
            Home
          </Link>
        </div>

        {process.env.NODE_ENV !== "production" && (
          <details className="text-left mt-4 text-xs text-gray-600 p-3 bg-gray-50 rounded-md">
            <summary className="font-medium">Error details</summary>
            <pre className="whitespace-pre-wrap break-words mt-2">
              {String(error?.message || error)}
            </pre>
            {error?.stack && (
              <pre className="whitespace-pre-wrap text-xs mt-2">
                {error.stack}
              </pre>
            )}
          </details>
        )}
      </div>
    </main>
  );
}
