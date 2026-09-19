"use client";
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";

export default function Loading() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="max-w-xl w-full bg-background rounded-2xl shadow-md p-8 text-center">
        <div className="flex items-center justify-center mb-6">
          <Spinner className="size-10 text-primary" />
        </div>
        <h2 className="text-xl font-semibold mb-2">Loading…</h2>
        <p className="text-sm text-gray-500 mb-6">
          We’re preparing the content — this usually takes a few seconds.
        </p>
        <div className="flex justify-center gap-3">
          <Link
            href="/"
            className="px-4 py-2 rounded-lg border text-sm text-gray-700">
            Home
          </Link>
        </div>
      </div>
    </main>
  );
}
