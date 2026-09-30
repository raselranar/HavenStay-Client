"use client";

import React, { useState } from "react";
import {
  User,
  Shield,
  ShieldAlert,
  ShieldCheck,
  ArrowUpDown,
} from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { serverMutate } from "@/lib/core/server";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function AllUsersPage({ initialUsers = [] }) {
  const router = useRouter();
  const hasUsers = Array.isArray(initialUsers) && initialUsers.length > 0;

  const handleRoleChange = async (user, newRole) => {
    const userId = user.userId || user._id;

    try {
      const res = await serverMutate(
        `/api/admin/users/${userId}/role`,
        "PATCH",
        {
          role: newRole,
        },
      );
      if (res.modifiedCount !== 0) {
        toast.success(`User role successfully updated to ${newRole}`);
        router.refresh();
        return;
      }
      toast.error("Failed to update user role");
    } catch (error) {
      toast.error("Failed to execute user role change mutation.");
    }
  };

  const getRoleIcon = (role) => {
    switch (role?.toLowerCase()) {
      case "admin":
        return <ShieldAlert className="h-4 w-4 text-red-600" />;
      case "owner":
        return <ShieldCheck className="h-4 w-4 text-blue-600" />;
      default:
        return <Shield className="h-4 w-4 text-gray-500" />;
    }
  };

  if (!hasUsers) {
    return (
      <div className="w-full space-y-8 ">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            All Registered Users
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Manage system accessibility parameters, authorize platform role
            modifications, and track account permissions.
          </p>
        </div>

        <hr className="border-gray-200" />

        <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50/60 p-10 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white text-gray-400 shadow-sm ring-1 ring-gray-200">
            <User className="h-6 w-6" />
          </div>
          <h3 className="mt-5 text-xl font-bold text-gray-900">
            No registered users yet
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            New account registrations will appear here once users join the
            platform.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-8 ">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          All Registered Users
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Manage system accessibility parameters, authorize platform role
          modifications, and track account permissions.
        </p>
      </div>

      <hr className="border-gray-200" />

      <div className="space-y-4">
        <div className="grid gap-4 sm:hidden">
          {initialUsers && initialUsers.length > 0 ? (
            initialUsers.map((user) => {
              const userId = user.userId || user._id;
              const currentRole = user.role || "Tenant";

              return (
                <div
                  key={userId}
                  className="rounded-3xl border border-gray-200 overflow-hidden bg-background p-4 shadow-sm">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center sm:gap-3 text-sm font-semibold text-gray-900">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-500">
                          <User className="h-4 w-4" />
                        </span>
                        {user.name || "Anonymous User"}
                      </div>
                      <div className="mt-1 text-sm text-gray-600">
                        {user.email}
                      </div>
                    </div>
                    <span
                      className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold capitalize ${currentRole.toLowerCase() === "admin"
                        ? "bg-red-50 text-red-700"
                        : currentRole.toLowerCase() === "owner"
                          ? "bg-blue-50 text-blue-700"
                          : "bg-gray-100 text-gray-700"
                        }`}>
                      {currentRole}
                    </span>
                  </div>

                  <div className="mt-4 rounded-3xl bg-gray-50 p-3 text-sm text-gray-700">
                    <div className="mb-2 font-medium text-gray-500">
                      Assigned Role
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-900">
                      {getRoleIcon(currentRole)}
                      {currentRole}
                    </div>
                  </div>

                  <div className="mt-4">
                    <Select
                      defaultValue={currentRole.toLowerCase()}
                      onValueChange={(value) => handleRoleChange(user, value)}>
                      <SelectTrigger className="h-10 w-full text-xs">
                        <SelectValue placeholder="Change Role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tenant">Tenant</SelectItem>
                        <SelectItem value="owner">Owner</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="rounded-3xl border border-gray-200 bg-background p-8 text-center text-sm text-gray-400">
              No registered system profiles located.
            </div>
          )}
        </div>

        <div className="hidden sm:block overflow-x-auto rounded-xl border border-gray-100 bg-background shadow-sm">
          <table className="w-full border-collapse text-left *:text-sm text-gray-500">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700 tracking-wider">
              <tr className="*:text-sm">
                <th className="px-6 py-4 font-semibold">User Identity</th>
                <th className="px-6 py-4 font-semibold">Email Reference</th>
                <th className="px-6 py-4 font-semibold">Current Role</th>
                <th className="px-6 py-4 font-semibold text-right">
                  Modify Permission Role
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 border-t border-gray-100">
              {initialUsers &&
                initialUsers.map((user) => {
                  const userId = user.userId || user._id;
                  const currentRole = user.role || "Tenant";

                  return (
                    <tr
                      key={userId}
                      className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                            <User className="h-4 w-4" />
                          </div>

                          <div className="font-bold text-gray-900">
                            {user.name || "Anonymous User"}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{user.email}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium capitalize
                        ${currentRole.toLowerCase() === "admin" ? "bg-red-50 text-red-700" : ""}
                        ${currentRole.toLowerCase() === "owner" ? "bg-blue-50 text-blue-700" : ""}
                        ${currentRole.toLowerCase() === "tenant" ? "bg-gray-100 text-gray-700" : ""}
                      `}>
                          {getRoleIcon(currentRole)}
                          {currentRole}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="w-40 ml-auto">
                          <Select
                            defaultValue={currentRole.toLowerCase()}
                            onValueChange={(value) =>
                              handleRoleChange(user, value)
                            }>
                            <SelectTrigger className="h-8 w-full text-xs">
                              <SelectValue placeholder="Change Role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="tenant">Tenant</SelectItem>
                              <SelectItem value="owner">Owner</SelectItem>
                              <SelectItem value="admin">Admin</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              {initialUsers.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-10 text-gray-400">
                    No registered system profiles located.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
