// src/components/home/RoleFeatures.jsx
"use client";
import { motion } from "framer-motion";
import { User, Building2, ShieldCheck, Check } from "lucide-react";
import Link from "next/link";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

export default function RoleFeatures() {
  const roles = [
    {
      icon: User,
      role: "Tenant",
      badge: "Search & Book",
      tagline: "Find your next home and book it safely.",
      cta: "Browse Properties",
      href: "/properties",
      bg: "from-blue-50 to-teal-50",
      text: "text-blue-700",
      features: [
        "Search and filter by location, type, and budget",
        "Save favorite properties for later",
        "Reserve and pay securely with Stripe",
      ],
    },
    {
      icon: Building2,
      role: "Owner",
      badge: "List & Earn",
      tagline: "List your property and watch it perform.",
      cta: "Start Listing",
      href: "/register",
      bg: "from-emerald-50 to-lime-50",
      text: "text-emerald-700",
      features: [
        "Publish listings with rich property details",
        "Edit and manage your inventory anytime",
        "Track monthly earnings with live analytics",
      ],
    },
    {
      icon: ShieldCheck,
      role: "Admin",
      badge: "Moderate & Oversee",
      tagline: "Keep the platform trusted and organized.",
      cta: "Manage Platform",
      href: "/register",
      bg: "from-indigo-50 to-violet-50",
      text: "text-indigo-700",
      features: [
        "Approve or reject listings with feedback",
        "Manage users and switch account roles",
        "Monitor revenue and transactions platform-wide",
      ],
    },
  ];

  return (
    <section className="py-24 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-6 text-center mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Built for Everyone in the Rental Journey
        </h2>
        <p className="text-gray-500 text-sm">
          Three dedicated experiences on a single connected platform.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {roles.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.role}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}>
              <Card
                className={`p-8 h-full border border-gray-100 shadow-xs hover:shadow-md transition-shadow rounded-2xl bg-gradient-to-br ${item.bg}`}>
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3.5 rounded-xl bg-white border border-white/60 shadow-xs">
                    <Icon className={`size-6 ${item.text}`} />
                  </div>
                  <Badge className="h-6 px-3 text-[0.625rem] bg-white/70 text-gray-700">
                    {item.badge}
                  </Badge>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {item.role}
                </h3>
                <p className="text-sm text-gray-500 mb-6">{item.tagline}</p>

                <ul className="space-y-3 mb-8 flex-1">
                  {item.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                      <span className="mt-0.5 p-0.5 rounded-full bg-white/70">
                        <Check className={`size-3.5 ${item.text}`} />
                      </span>
                      <span className="leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button asChild className="w-full bg-primary">
                  <Link href={item.href}>{item.cta}</Link>
                </Button>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}