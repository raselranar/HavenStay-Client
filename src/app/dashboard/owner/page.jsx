"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Cartogrid,
  Tooltip,
  AreaChart,
  Area,
} from "recharts";
import {
  Banknote,
  Building,
  CalendarCheck,
  Loader2,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";
import { protectedFetch } from "@/lib/core/server";
import { useRouter } from "next/navigation";
import MonthlyEarningsChart from "@/components/MonthlyEarningsChart";

export default function OwnerAnalyticsDashboard() {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchDashboardMetrics() {
      try {
        setLoading(true);
        const analytics = await protectedFetch("/api/owner/analytics");
        console.log(analytics);
        setMetrics(analytics);
      } catch (err) {
        console.error("Failed fetching dashboard metrics:", err);
        setError(
          "Could not parse statistical values from the marketplace engine.",
        );
      } finally {
        setLoading(false);
      }
    }
    fetchDashboardMetrics();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
        <p className="text-slate-500 font-medium text-sm">
          Parsing revenue metrics and listings records...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-100 rounded-2xl p-6 text-center max-w-lg mx-auto my-12">
        <p className="text-red-600 font-medium">{error}</p>
        <button
          onClick={() => router.refresh()}
          className="mt-4 px-4 py-2 bg-background text-red-700 border border-red-200 rounded-xl text-sm font-semibold hover:bg-red-100 transition">
          Retry Request
        </button>
      </div>
    );
  }

  const cardConfig = [
    {
      title: "Total Earnings",
      value: `$${metrics?.totalEarnings?.toLocaleString() || "0"}`,
      subtext: "Sum of all successful rental windows",
      icon: Banknote,
      color: "bg-emerald-50 text-emerald-600 border-emerald-100",
    },
    {
      title: "Total Properties",
      value: metrics?.totalProperties || 0,
      subtext: "Properties created by your account",
      icon: Building,
      color: "bg-indigo-50 text-indigo-600 border-indigo-100",
    },
    {
      title: "Total Bookings",
      value: metrics?.totalBookings || 0,
      subtext: "Confirmed occupancy schedules",
      icon: CalendarCheck,
      color: "bg-amber-50 text-amber-600 border-amber-100",
    },
  ];

  return (
    <div className="space-y-8">
      <Header />
      <MetricsCards cards={cardConfig} />
      <MonthlyEarningsChart data={metrics?.monthlyEarnings || []} />
    </div>
  );
}

function Header() {
  return (
    <div>
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
        Performance Dashboard
      </h1>
      <p className="text-slate-500 mt-1 text-sm md:text-base">
        Track transaction pipelines, inventory states, and operational active
        occupancy data.
      </p>
    </div>
  );
}

function MetricsCards({ cards }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className="bg-background rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-shadow flex items-start justify-between">
            <div className="space-y-3">
              <span className="text-sm font-semibold text-slate-400 tracking-wide block uppercase">
                {card.title}
              </span>
              <span className="text-3xl font-bold text-slate-800 tracking-tight block">
                {card.value}
              </span>
              <span className="text-xs text-slate-500 font-medium block">
                {card.subtext}
              </span>
            </div>
            <div className={`p-3.5 rounded-xl border ${card.color}`}>
              <Icon size={24} strokeWidth={2.2} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
