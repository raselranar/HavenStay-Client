import { TrendingUp } from "lucide-react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const MonthlyEarningsChart = ({ data }) => {
  const chartData = Array.isArray(data) ? data : [];

  if (!chartData.length) {
    return (
      <div className="bg-background rounded-2xl border border-slate-100 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 pb-4 border-b border-slate-50">
          <div>
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <TrendingUp size={20} className="text-indigo-600" />
              Monthly Earnings Overview
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Rolling 12-month payment analytics pipeline data
            </p>
          </div>
          <span className="mt-2 sm:mt-0 px-3 py-1 bg-slate-50 rounded-lg text-xs font-semibold text-slate-500 border border-slate-100 self-start">
            Currency: USD ($)
          </span>
        </div>

        <div className="h-85 w-full rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 flex items-center justify-center">
          <div className="text-center px-4">
            <TrendingUp size={32} className="mx-auto text-slate-300" />
            <p className="mt-3 text-sm font-semibold text-slate-600">
              No earnings data available yet
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Completed bookings and payouts will appear here.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background rounded-2xl border border-slate-100 p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 pb-4 border-b border-slate-50">
        <div>
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <TrendingUp size={20} className="text-indigo-600" />
            Monthly Earnings Overview
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Rolling 12-month payment analytics pipeline data
          </p>
        </div>
        <span className="mt-2 sm:mt-0 px-3 py-1 bg-slate-50 rounded-lg text-xs font-semibold text-slate-500 border border-slate-100 self-start">
          Currency: USD ($)
        </span>
      </div>

      <div className="h-85 w-full pr-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <XAxis
              dataKey="month"
              stroke="#94a3b8"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              dy={10}
            />
            <YAxis
              stroke="#94a3b8"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
              dx={-5}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                borderRadius: "12px",
                border: "1px solid #f1f5f9",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.05)",
              }}
              labelStyle={{
                fontWeight: "600",
                color: "#1e293b",
                fontSize: "13px",
              }}
              itemStyle={{
                color: "#4f46e5",
                fontSize: "13px",
                padding: "2px 0",
              }}
              formatter={(value) => [`$${value.toLocaleString()}`, "Earnings"]}
            />
            <Line
              type="monotone"
              dataKey="earnings"
              stroke="#4f46e5"
              strokeWidth={3}
              dot={{ r: 5, strokeWidth: 2, fill: "#ffffff" }}
              activeDot={{ r: 7, strokeWidth: 0, fill: "#4f46e5" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
export default MonthlyEarningsChart;
