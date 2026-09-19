"use client";
import DashboardShell from "@/components/dashboard/DashboardShell";
import Link from "next/link";

export default function DashboardNotFound() {
  return (
    <DashboardShell>
      <main className="min-h-[60vh] flex items-center justify-center p-6">
        <div className="max-w-lg w-full bg-background rounded-2xl shadow p-8 text-center">
          <h2 className="text-2xl font-semibold mb-2">Dashboard page not found</h2>
          <p className="text-sm text-gray-500 mb-6">The requested dashboard page does not exist.</p>
          <div className="flex items-center justify-center gap-3">
            <button onClick={() => window.history.back()} className="px-4 py-2 rounded-lg border">Go back</button>
            <Link href="/dashboard" className="px-4 py-2 rounded-lg bg-primary text-white">Dashboard Home</Link>
          </div>
        </div>
      </main>
    </DashboardShell>
  );
}
