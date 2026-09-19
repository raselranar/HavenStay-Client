import { protectedFetch } from "@/lib/core/server";
import { getUserSession } from "@/lib/core/session";
import { ArrowUpRight, Heart, Calendar, CreditCard, Home } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Tenant Dashboard",
};
export default async function TenantDashboard() {
  const session = await getUserSession();
  const user = session?.user;
  const analytics = await protectedFetch("/api/properties/tenant-analytics");

  const analyticsData = [
    {
      label: "Active Bookings",
      value: analytics?.bookingsCount ?? 0,
      sub: "Properties booked",
      icon: Calendar,
      color: "text-blue-600",
    },
    {
      label: "Saved Places",
      value: analytics?.favoritesCount ?? 0,
      sub: "Homes in favorites",
      icon: Heart,
      color: "text-pink-600",
    },
    {
      label: "Active Rentals",
      value: analytics?.activeRentalsCount ?? 0,
      sub: "Properties rented",
      icon: Home,
      color: "text-indigo-600",
    },
  ];

  return (
    <div className="space-y-10 ">
      {/* Dynamic Salutation Heading Area */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
          Good Morning, {user?.name}
        </h1>
        <p className="text-gray-500 mt-0.5">
          Manage your upcoming stays and favorite destinations.
        </p>
      </div>

      {/* Grid Dashboard Analytics Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {analyticsData.map((card, i) => (
          <div
            key={i}
            className="bg-background border border-gray-100 p-6 rounded-2xl shadow-xs relative flex flex-col justify-between h-36">
            <div className="flex justify-between items-start">
              <span className=" font-bold text-gray-400 uppercase tracking-wider">
                {card.label}
              </span>
              <card.icon className={`size-4 ${card.color}`} />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-900 tracking-tight">
                {card.value}
              </h3>
              <p className=" text-gray-400 font-medium mt-0.5">{card.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
