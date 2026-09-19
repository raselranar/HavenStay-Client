"use client";
import Link from "next/link";
import DashboardShell from "@/components/dashboard/DashboardShell";
import { useRouter } from "next/navigation";

export default function DashboardError({ error, reset }) {
  const router = useRouter();
  console.error(error);

  return (
    <DashboardShell>
      <main className="min-h-[60vh] flex items-center justify-center p-6">
        <div className="w-full bg-background rounded-2xl shadow p-8 text-center">
          <h2 className="text-2xl font-semibold mb-2">Dashboard error</h2>
          <p className="text-sm text-gray-500 mb-6">
            We couldn&apos;t load this dashboard section. You can retry or
            return to the dashboard home.
          </p>

          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => router.refresh()}
              className="px-4 py-2 rounded-lg bg-primary text-white">
              Retry
            </button>
            <Link href="/dashboard" className="px-4 py-2 rounded-lg border">
              Dashboard Home
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
    </DashboardShell>
  );
}
