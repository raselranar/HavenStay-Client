"use client";
import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Heart,
  LogOut,
  ArrowLeft,
  User,
  Building,
  User2,
  CirclePlus,
  Users,
} from "lucide-react";

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { Button } from "../ui/button";
import { avatarName } from "@/app/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export default function DashboardShell({ children, user = null }) {
  const pathname = usePathname();
  const router = useRouter();

  const role = user?.role;

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.info("Logged out successfully");
          router.push("/login");
          router.refresh();
        },
      },
    });
  };

  const AllMenuItems = {
    tenant: [
      { name: "Overview", href: "/dashboard/tenant", icon: LayoutDashboard },
      {
        name: "My Bookings",
        href: "/dashboard/tenant/my-bookings",
        icon: BookOpen,
      },
      { name: "Favorites", href: "/dashboard/tenant/favorites", icon: Heart },
      { name: "Profile", href: "/dashboard/tenant/profile", icon: User },
    ],
    owner: [
      { name: "Overview", href: "/dashboard/owner", icon: LayoutDashboard },
      {
        name: "Add Property",
        href: "/dashboard/owner/add-property",
        icon: CirclePlus,
      },
      {
        name: "My Properties",
        href: "/dashboard/owner/my-properties",
        icon: Building,
      },
      { name: "Bookings", href: "/dashboard/owner/bookings", icon: BookOpen },
      { name: "Profile", href: "/dashboard/owner/profile", icon: User2 },
    ],
    admin: [
      {
        name: "All Properties",
        href: "/dashboard/admin/properties",
        icon: Building,
      },
      {
        name: "All Users",
        href: "/dashboard/admin/users",
        icon: Users,
      },
      {
        name: "Transactions",
        href: "/dashboard/admin/transactions",
        icon: BookOpen,
      },
      {
        name: "Profile",
        href: "/dashboard/admin/profile",
        icon: User2,
      },
    ],
  };

  const menuItems = AllMenuItems[role || "tenant"];

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background flex flex-1 text-gray-900 font-sans">
        {/* Sidebar Trigger for small screens */}
        <div className="fixed top-4 left-4 z-50 lg:hidden">
          <SidebarTrigger />
        </div>

        <Sidebar side="left" variant="sidebar" collapsible="offcanvas">
          <SidebarContent>
            <div className="p-4 flex flex-col gap-6 h-full">
              <SidebarHeader>
                <div className="flex items-center gap-2 px-2">
                  <Link
                    href="/"
                    className="text-xl flex items-center gap-2 font-bold text-primary tracking-tight">
                    <ArrowLeft /> Back To Home
                  </Link>
                </div>
              </SidebarHeader>

              <div className="flex items-center gap-3 bg-gray-50/50 p-3 rounded-xl border border-gray-100/60">
                <Avatar size="lg">
                  <AvatarImage src={user?.image} />
                  <AvatarFallback>{avatarName(user?.name)}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="text-lg font-bold text-gray-900">
                    {user?.name}
                  </h4>
                  <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">
                    {user?.role}
                  </p>
                </div>
              </div>

              <nav className="flex-1">
                <SidebarMenu>
                  {menuItems?.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;
                    return (
                      <SidebarMenuItem key={item.href}>
                        <Link href={item.href}>
                          <SidebarMenuButton
                            asChild
                            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide ${isActive
                                ? "bg-primary text-white shadow-xs hover:bg-primary/80 hover:text-white"
                                : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                              }`}>
                            <div>
                              <Icon className="size-4 shrink-0" />
                              <span>{item.name}</span>
                            </div>
                          </SidebarMenuButton>
                        </Link>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </nav>

              <SidebarFooter>
                <div className="space-y-1 pt-4 border-t border-gray-100">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleLogout}
                    className="w-full p-4 flex items-center gap-3">
                    <LogOut className="size-4" />
                    Logout
                  </Button>
                </div>
              </SidebarFooter>
            </div>
          </SidebarContent>
        </Sidebar>

        <SidebarInset className="flex-1 w-full lg:overflow-y-auto p-6 lg:p-10 pt-20 lg:pt-10">
          {children}
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
