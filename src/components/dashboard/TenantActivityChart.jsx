"use client";

import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

export default function TenantActivityChart({ data = [] }) {
    const chartData = Array.isArray(data) && data.length ? data : [];

    if (!chartData.length) {
        return (
            <div className="bg-background rounded-2xl border border-slate-100 p-6 shadow-sm">
                <div className="mb-6">
                    <h2 className="text-lg font-bold text-slate-800">
                        Activity Overview
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">
                        Your saved homes and bookings summary will appear here.
                    </p>
                </div>
                <div className="h-72 w-full rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 flex items-center justify-center">
                    <p className="text-sm text-slate-500">No activity data available yet.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-background rounded-2xl border border-slate-100 p-6 shadow-sm">
            <div className="flex items-center justify-between gap-3 pb-4 mb-6 border-b border-slate-100">
                <div>
                    <h2 className="text-lg font-bold text-slate-800">Activity Overview</h2>
                    <p className="text-sm text-slate-500 mt-1">
                        Snapshot of your bookings, favorite homes, and active rentals.
                    </p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold border border-indigo-100">
                    Live
                </span>
            </div>

            <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                        <CartesianGrid vertical={false} stroke="#e2e8f0" strokeDasharray="4 4" />
                        <XAxis
                            dataKey="name"
                            stroke="#94a3b8"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            allowDecimals={false}
                            stroke="#94a3b8"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <Tooltip
                            cursor={{ fill: "rgba(99, 102, 241, 0.08)" }}
                            contentStyle={{
                                backgroundColor: "#ffffff",
                                border: "1px solid #e2e8f0",
                                borderRadius: "12px",
                                boxShadow: "0 10px 20px rgba(15, 23, 42, 0.08)",
                            }}
                            formatter={(value) => [`${value}`, "Count"]}
                        />
                        <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
