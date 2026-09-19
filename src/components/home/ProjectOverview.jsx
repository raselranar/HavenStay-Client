// src/components/home/ProjectOverview.jsx
"use client";
import { motion } from "framer-motion";
import { Users, ShieldCheck, CreditCard, BarChart3 } from "lucide-react";

export default function ProjectOverview() {
  const highlights = [
    {
      icon: Users,
      title: "Three Roles, One Platform",
      desc: "Dedicated dashboards for Tenants, Owners, and Admins — each with tailored tools and permissions.",
    },
    {
      icon: ShieldCheck,
      title: "Verified Listings",
      desc: "Every property goes through an admin approval pipeline before it becomes publicly visible.",
    },
    {
      icon: CreditCard,
      title: "Secure Online Payments",
      desc: "Tenants reserve and pay for stays directly on the platform with Stripe-powered checkout.",
    },
    {
      icon: BarChart3,
      title: "Live Analytics",
      desc: "Owners and admins track earnings, bookings, and platform health through real-time charts.",
    },
  ];

  const stats = [
    { value: "3", label: "User Roles" },
    { value: "Live", label: "API & Database" },
    { value: "Real", label: "Stripe Payments" },
    { value: "24/7", label: "Online Platform" },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              What is HavenStay?
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              A full-stack rental and property management platform.
            </p>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                HavenStay is a complete online marketplace where verified
                tenants discover homes, trusted owners list and manage their
                properties, and admins keep the whole platform safe and
                organized.
              </p>
              <p>
                Everything runs on live data — real listings, real user
                accounts, real bookings and real payments — so what you see on
                this site is the actual working product, not a static demo.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {highlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: idx * 0.08 }}
                  viewport={{ once: true }}
                  className="p-6 rounded-2xl bg-slate-50 border border-slate-100 shadow-xs">
                  <div className="mb-4 p-3 rounded-xl bg-background border border-slate-100 w-fit">
                    <Icon className="size-5 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-base mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl shadow-xs border border-gray-100 flex flex-col items-center justify-center text-center min-h-[120px] bg-gradient-to-br from-gray-50 to-white">
              <span className="text-2xl font-bold text-gray-900 mb-1">
                {stat.value}
              </span>
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}