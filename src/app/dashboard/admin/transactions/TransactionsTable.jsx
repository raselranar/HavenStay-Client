"use client";

import React, { useState } from "react";
import {
  ArrowUpDown,
  CreditCard,
  Search,
  Download,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function TransactionsTable({ initialTransactions = [] }) {
  console.log(initialTransactions);
  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
            <CheckCircle2 className="h-3 w-3" /> Completed
          </span>
        );
      case "pending":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-700">
            <AlertCircle className="h-3 w-3" /> Pending
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-medium text-red-700">
            <XCircle className="h-3 w-3" /> Failed
          </span>
        );
    }
  };

  return (
    <div className="w-full space-y-6 ">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Transaction History
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Monitor and track inbound tenant payouts, platform commissions, and
            processing cycles.
          </p>
        </div>
      </div>

      <hr className="border-gray-200" />

      {/* Data Layout Grid */}
      <div className="overflow-x-auto rounded-xl border border-gray-100 bg-background shadow-sm">
        <table className="w-full border-collapse text-left text-sm text-gray-500">
          <thead className="bg-gray-50  uppercase text-gray-700 tracking-wider">
            <tr className="*:text-xs">
              <th className="px-6 py-4 font-semibold">Transaction ID</th>
              <th className="px-6 py-4 font-semibold">Tenant Name</th>
              <th className="px-6 py-4 font-semibold">Property Name</th>
              <th className="px-6 py-4 font-semibold">Owner Name</th>
              <th className="px-6 py-4 font-semibold">Date</th>
              <th className="px-6 py-4 font-semibold">Amount</th>
              <th className="px-6 py-4 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {initialTransactions?.map((txn) => (
              <tr key={txn.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-mono text-xs font-semibold text-gray-900">
                  {txn?.id}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900">
                  {txn?.tenantName}
                </td>
                <td
                  className="px-6 py-4 max-w-xs truncate text-gray-600"
                  title={txn?.propertyTitle}>
                  {txn?.propertyTitle}
                </td>
                <td className="px-6 py-4 text-xs text-gray-500">
                  {txn?.ownerName}
                </td>
                <td className="px-6 py-4 text-xs text-gray-500 flex items-center gap-1.5 mt-1.5">
                  <CreditCard className="h-3.5 w-3.5 text-gray-400" />
                  {txn?.date}
                </td>
                <td className="px-6 py-4 font-bold text-gray-900">
                  ${txn?.amount.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-right">
                  {getStatusBadge(txn?.status)}
                </td>
              </tr>
            ))}
            {initialTransactions.length === 0 && (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-12 text-gray-400 italic">
                  No matching transaction traces matching evaluation parameters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
