"use client";

import {
    PieChart,
    Pie,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from "recharts";

export default function MonthlyAttendanceChart({ data }: { data: any[] }) {
    const total = data?.reduce((sum, item) => sum + item.value, 0) || 0;

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border h-80 relative">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 text-center">
                Monthly Attendance Overview
            </h2>

            {/* Gradients */}
            <svg width="0" height="0">
                <defs>
                    <linearGradient id="presentPie" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#22c55e" stopOpacity={0.9} />
                        <stop offset="100%" stopColor="#22c55e" stopOpacity={0.6} />
                    </linearGradient>

                    <linearGradient id="absentPie" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#ef4444" stopOpacity={0.9} />
                        <stop offset="100%" stopColor="#ef4444" stopOpacity={0.6} />
                    </linearGradient>
                </defs>
            </svg>

            {/* Center Label */}
            <div className="absolute top-[54%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                <p className="text-3xl font-bold text-gray-800">{total}</p>
                <p className="text-gray-500 text-sm">Total Records</p>
            </div>

            {/* Pie Chart */}
            <div className="absolute top-4 left-0 w-full h-full">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={70}
                            outerRadius={110}
                            paddingAngle={6}
                            dataKey="value"
                            cornerRadius={10}
                        >
                            {data.map((item, index) => (
                                <Cell
                                    key={index}
                                    fill={index === 0 ? "url(#presentPie)" : "url(#absentPie)"}
                                />
                            ))}
                        </Pie>

                        <Tooltip
                            contentStyle={{
                                borderRadius: "10px",
                                border: "none",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                            }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-6 text-sm">
                {data.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <span
                            className="w-3 h-3 rounded-full"
                            style={{
                                backgroundColor: index === 0 ? "#22c55e" : "#ef4444",
                            }}
                        ></span>
                        <span className="text-gray-600">{item.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
