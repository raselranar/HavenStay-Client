// src/components/home/DashboardPreview.jsx
"use client";
import { motion } from "framer-motion";
import { TrendingUp, ShieldAlert, CalendarHeart, ArrowRight } from "lucide-react";
import Link from "next/link";

function BrowserFrame({ label, children }) {
  return (
    <div className="rounded-2xl border border-gray-100 shadow-sm overflow-hidden bg-white group-hover:shadow-md transition-shadow">
      {/* Browser Chrome Bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 border-b border-gray-100">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-red-400" />
          <span className="size-2.5 rounded-full bg-amber-400" />
          <span className="size-2.5 rounded-full bg-green-400" />
        </div>
        <div className="ml-2 flex-1 max-w-xs h-5 rounded-md bg-white border border-gray-100 flex items-center px-3">
          <span className="text-[0.625rem] text-gray-400 truncate">
            haven-stay-client.vercel.app/{label}
          </span>
        </div>
      </div>
      <div className="bg-white p-4">{children}</div>
    </div>
  );
}

function MetricMini({ title, value, color }) {
  return (
    <div className="rounded-xl border border-gray-100 bg-gray-50/60 px-3 py-2.5">
      <p className="text-[0.5625rem] font-semibold text-gray-400 uppercase tracking-wide">
        {title}
      </p>
      <p className={`text-base font-bold text-gray-900 ${color ?? ""}`}>
        {value}
      </p>
    </div>
  );
}

function OwnerMockup() {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-3">
        <MetricMini title="Total Earnings" value="$8,540" color="text-emerald-600" />
        <MetricMini title="Properties" value="12" color="text-indigo-600" />
        <MetricMini title="Bookings" value="34" color="text-amber-600" />
      </div>
      <div className="rounded-xl border border-gray-100 p-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <TrendingUp className="size-3 text-indigo-600" />
            <span className="text-[0.625rem] font-bold text-gray-700">
              Monthly Earnings
            </span>
          </div>
          <span className="text-[0.5625rem] text-gray-400 font-medium">USD ($)</span>
        </div>
        <svg viewBox="0 0 200 60" className="w-full h-16">
          <path
            d="M0 52 L20 48 L40 50 L60 45 L80 40 L100 42 L120 30 L140 34 L160 20 L180 24 L200 10"
            fill="none"
            stroke="#4f46e5"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx="200" cy="10" r="3.5" fill="#4f46e5" />
        </svg>
      </div>
    </div>
  );
}

function AdminMockup() {
  const bars = [
    { label: "Apt", h: [28, 8, 4] },
    { label: "Villa", h: [20, 4, 3] },
    { label: "Pent", h: [14, 3, 3] },
    { label: "Cabin", h: [18, 2, 2] },
    { label: "Studio", h: [24, 4, 3] },
  ];
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <MetricMini title="Total Listings" value="142" color="text-blue-600" />
        <MetricMini title="Platform Users" value="840" color="text-purple-600" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <MetricMini title="Revenue" value="$34.5K" color="text-emerald-600" />
        <MetricMini title="Pending" value="12" color="text-amber-600" />
      </div>
      <div className="rounded-xl border border-gray-100 p-3">
        <div className="flex items-center gap-1.5 mb-3">
          <ShieldAlert className="size-3 text-amber-500" />
          <span className="text-[0.625rem] font-bold text-gray-700">
            Verification Queue
          </span>
        </div>
        <div className="flex items-end gap-2 h-16">
          {bars.map((bar, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full flex items-end gap-px">
                <span
                  className="flex-1 rounded-sm bg-emerald-400"
                  style={{ height: `${bar.h[0]}px` }}
                />
                <span
                  className="flex-1 rounded-sm bg-amber-400"
                  style={{ height: `${bar.h[1]}px` }}
                />
                <span
                  className="flex-1 rounded-sm bg-red-400"
                  style={{ height: `${bar.h[2]}px` }}
                />
              </div>
              <span className="text-[0.5rem] text-gray-400">{bar.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TenantMockup() {
  const cards = [
    { label: "Active Bookings", value: "3", color: "text-blue-600" },
    { label: "Saved Places", value: "8", color: "text-pink-600" },
    { label: "Active Rentals", value: "1", color: "text-indigo-600" },
  ];
  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">
        <p className="text-sm font-bold text-gray-900">Good Morning, Alex</p>
        <p className="text-[0.625rem] text-gray-400">
          Manage upcoming stays and favorite destinations.
        </p>
      </div>
      <div className="space-y-2.5">
        {cards.map((card, i) => (
          <div
            key={i}
            className="flex items-center justify-between rounded-xl border border-gray-100 px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-gray-50 border border-gray-100">
                <CalendarHeart
                  className={`size-3.5 ${i === 1 ? "text-pink-500" : card.color}`}
                />
              </div>
              <span className="text-[0.625rem] font-semibold text-gray-500 uppercase tracking-wide">
                {card.label}
              </span>
            </div>
            <span className={`text-lg font-bold text-gray-900 ${card.color}`}>
              {card.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DashboardPreview() {
  const frames = [
    {
      label: "dashboard/owner",
      title: "Owner Analytics",
      desc: "Track earnings, inventory, and monthly revenue in real time.",
      mockup: <OwnerMockup />,
    },
    {
      label: "dashboard/admin",
      title: "Admin Console",
      desc: "Monitor listings, users, revenue, and the verification queue.",
      mockup: <AdminMockup />,
    },
    {
      label: "dashboard/tenant",
      title: "Tenant Dashboard",
      desc: "Manage bookings, saved places, and active rentals.",
      mockup: <TenantMockup />,
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Real Dashboards, Running Live
        </h2>
        <p className="text-gray-500 text-sm">
          Every role gets its own analytics-driven command center.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {frames.map((frame, idx) => (
          <motion.div
            key={frame.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="group">
            <BrowserFrame label={frame.label}>{frame.mockup}</BrowserFrame>
            <div className="mt-4">
              <h3 className="font-bold text-gray-900 text-base">
                {frame.title}
              </h3>
              <p className="text-sm text-gray-500 mt-0.5">{frame.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center">
        <Link
          href="/register"
          className="inline-flex items-center gap-2 rounded-xl bg-primary text-white px-6 py-3.5 text-sm font-semibold hover:opacity-90 transition">
          Create an Account to Try Them Yourself
          <ArrowRight className="size-4" />
        </Link>
      </motion.div>
    </section>
  );
}