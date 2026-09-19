"use client";
import DashboardShell from "@/components/dashboard/DashboardShell";
import { Spinner } from "@/components/ui/spinner";

export default function DashboardLoading() {
  return (
    <DashboardShell>
      <div className="min-h-[60vh] flex-1 flex items-center p-6">
        <div className="bg-background rounded-2xl shadow p-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <Spinner className="size-10 text-primary" />
          </div>
          <h3 className="text-lg font-semibold mb-1">Loading dashboard</h3>
          <p className="text-sm text-gray-500">
            Fetching your dashboard content — one moment please.
          </p>
        </div>
      </div>
    </DashboardShell>
  );
}
