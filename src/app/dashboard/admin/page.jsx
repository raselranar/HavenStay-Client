"use client";

import React from "react";
import { Building2, Users, CreditCard, ShieldAlert } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function AdminAnalyticsPage({ systemStats, chartsData }) {
  const hasStats =
    systemStats &&
    Object.values(systemStats).some(
      (value) => value !== null && value !== undefined && value !== "",
    );
  const hasChartData = Array.isArray(chartsData) && chartsData.length > 0;

  if (!hasStats && !hasChartData) {
    return (
      <div className="w-full space-y-8 p-6 lg:p-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Admin Console Overview
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Global operations control, structural verification queues, and system
            metric monitors.
          </p>
        </div>

        <hr className="border-gray-200" />

        <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50/60 p-10 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white text-gray-400 shadow-sm ring-1 ring-gray-200">
            <ShieldAlert className="h-6 w-6" />
          </div>
          <h3 className="mt-5 text-xl font-bold text-gray-900">
            No platform metrics available yet
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            Listings, users, and verification data will appear here once the
            dashboard has fresh activity.
          </p>
        </div>
      </div>
    );
  }

  const stats = systemStats || {
    totalProperties: 0,
    totalUsers: 0,
    totalRevenue: 0,
    pendingVerifications: 0,
  };

  const data = chartsData || [];

  return (
    <div className="w-full space-y-8 p-6 lg:p-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Admin Console Overview
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Global operations control, structural verification queues, and system
          metric monitors.
        </p>
      </div>

      <hr className="border-gray-200" />

      {/* Metric Overviews Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl bg-background p-6 border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Total Listings
            </p>
            <h3 className="mt-2 text-2xl font-bold text-gray-900">
              {stats.totalProperties}
            </h3>
          </div>
          <div className="rounded-lg bg-blue-50 p-3 text-blue-600">
            <Building2 className="h-5 w-5" />
          </div>
        </div>

        <div className="rounded-xl bg-background p-6 border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Platform Users
            </p>
            <h3 className="mt-2 text-2xl font-bold text-gray-900">
              {stats.totalUsers}
            </h3>
          </div>
          <div className="rounded-lg bg-purple-50 p-3 text-purple-600">
            <Users className="h-5 w-5" />
          </div>
        </div>

        <div className="rounded-xl bg-background p-6 border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Gross Bookings Volume
            </p>
            <h3 className="mt-2 text-2xl font-bold text-gray-900">
              ${stats.totalRevenue.toLocaleString()}
            </h3>
          </div>
          <div className="rounded-lg bg-emerald-50 p-3 text-emerald-600">
            <CreditCard className="h-5 w-5" />
          </div>
        </div>

        <div className="rounded-xl bg-background p-6 border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Pending Tasks
            </p>
            <h3 className="mt-2 text-2xl font-bold text-gray-900">
              {stats.pendingVerifications}
            </h3>
          </div>
          <div className="rounded-lg bg-amber-50 p-3 text-amber-600">
            <ShieldAlert className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Property Status Distribution Chart */}
      <div className="rounded-xl border border-gray-100 bg-background p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900">
            Property Verification Metrics
          </h2>
          <p className="text-xs text-gray-500">
            Distribution profile of structural units currently across platform
            stages
          </p>
        </div>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#F9FAFB"
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6B7280", fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6B7280", fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  borderRadius: "8px",
                  color: "#FFF",
                }}
              />
              <Legend verticalAlign="top" height={36} iconType="circle" />
              <Bar dataKey="Approved" fill="#10B981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Pending" fill="#F59E0B" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Rejected" fill="#EF4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
