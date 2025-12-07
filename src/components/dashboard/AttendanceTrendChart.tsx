"use client";

import {
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Area,
    AreaChart,
} from "recharts";
import NoData from "../extras/NoData";

export default function AttendanceTrendChart({ data }: { data: any[] }) {

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border h-80 pb-12">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
                Attendance Trend (Last 7 Days)
            </h2>

            {!data || data.length === 0 ? (
                <NoData />
            ) : (
                <>
                    <svg width="0" height="0">
                        <defs>
                            <linearGradient id="presentGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#22c55e" stopOpacity={0.4} />
                                <stop offset="100%" stopColor="#22c55e" stopOpacity={0.05} />
                            </linearGradient>

                            <linearGradient id="absentGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#ef4444" stopOpacity={0.35} />
                                <stop offset="100%" stopColor="#ef4444" stopOpacity={0.05} />
                            </linearGradient>
                        </defs>
                    </svg>

                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            data={data}
                            margin={{ top: 5, right: 15, left: -10, bottom: 0 }}
                        >
                            <XAxis
                                dataKey="date"
                                tick={{ fill: "#6b7280", fontSize: 12 }}
                                axisLine={false}
                                tickLine={false}
                            />

                            <YAxis
                                tick={{ fill: "#6b7280", fontSize: 12 }}
                                axisLine={false}
                                tickLine={false}
                            />

                            <Tooltip
                                contentStyle={{
                                    borderRadius: "10px",
                                    border: "none",
                                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                                }}
                            />

                            <Area
                                type="monotone"
                                dataKey="present"
                                stroke="#22c55e"
                                strokeWidth={3}
                                fill="url(#presentGradient)"
                                dot={false}
                            />

                            <Area
                                type="monotone"
                                dataKey="absent"
                                stroke="#ef4444"
                                strokeWidth={3}
                                fill="url(#absentGradient)"
                                dot={false}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </>
            )}
        </div>
    );
}
