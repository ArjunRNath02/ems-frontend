"use client";

import { useEffect, useState } from "react";
import { EmployeeService } from "@/services/employeeService";
import { AttendanceService } from "@/services/attendanceService";

import {
    PieChart,
    Pie,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from "recharts";

export default function EmployeeMonthlyAttendance() {
    const [employees, setEmployees] = useState<any[]>([]);
    const [selectedEmployee, setSelectedEmployee] = useState<number | null>(null);
    const [selectedMonth, setSelectedMonth] = useState<string>("All");
    const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
    const [attendanceSummary, setAttendanceSummary] = useState<any[]>([]);

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);

    useEffect(() => {
        EmployeeService.getAllEmployees().then(setEmployees);
    }, []);

    useEffect(() => {
        if (selectedEmployee === null) return;

        async function load() {
            const records = await AttendanceService.getAttendanceByEmployee(selectedEmployee!);

            // Filter by year
            let filtered = records.filter((rec: any) => {
                const date = new Date(rec.date);
                return date.getFullYear() === selectedYear;
            });

            // Filter by month if not "All"
            if (selectedMonth !== "All") {
                const monthIndex = months.indexOf(selectedMonth);
                filtered = filtered.filter((rec: any) => new Date(rec.date).getMonth() === monthIndex);
            }

            const present = filtered.filter((a: any) => a.status === "PRESENT").length;
            const absent = filtered.filter((a: any) => a.status === "ABSENT").length;

            setAttendanceSummary([
                { name: "Present", value: present },
                { name: "Absent", value: absent }
            ]);
        }

        load();
    }, [selectedEmployee, selectedMonth, selectedYear]);

    const total = attendanceSummary.reduce((s, i) => s + i.value, 0);

    return (
        <div className="bg-white p-4 rounded-2xl shadow-sm border h-80 flex flex-col">

            <h2 className="text-lg font-semibold text-gray-800 mb-3">
                Employee Monthly Attendance
            </h2>

            <div className="flex flex-row flex-1 gap-4">

                {/* Left Side: Selectors */}
                <div className="flex flex-col gap-3 w-56">
                    {/* Employee Selector */}
                    <div>
                        <p className="text-xs font-medium text-gray-600 mb-1">Employee</p>
                        <select
                            className="w-full border rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                            value={selectedEmployee ?? ""}
                            onChange={(e) => setSelectedEmployee(Number(e.target.value))}
                        >
                            <option value="">Select Employee</option>
                            {employees.map((emp) => (
                                <option key={emp.id} value={emp.id}>
                                    {emp.firstName} {emp.lastName}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Month Selector */}
                    <div>
                        <p className="text-xs font-medium text-gray-600 mb-1">Month</p>
                        <select
                            className="w-full border rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                            value={selectedMonth}
                            onChange={(e) => setSelectedMonth(e.target.value)}
                        >
                            <option value="All">All</option>
                            {months.map((m) => (
                                <option key={m}>{m}</option>
                            ))}
                        </select>
                    </div>

                    {/* Year Selector */}
                    <div>
                        <p className="text-xs font-medium text-gray-600 mb-1">Year</p>
                        <select
                            className="w-full border rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(Number(e.target.value))}
                        >
                            {years.map((year) => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Right Side: Pie Chart */}
                <div className="flex-1 flex flex-col items-center justify-center relative">

                    {/* Gradients */}
                    <svg width="0" height="0">
                        <defs>
                            <linearGradient id="presentPie" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="#22c55e" stopOpacity={0.9} />
                                <stop offset="100%" stopColor="#16a34a" stopOpacity={0.7} />
                            </linearGradient>
                            <linearGradient id="absentPie" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="#ef4444" stopOpacity={0.9} />
                                <stop offset="100%" stopColor="#dc2626" stopOpacity={0.7} />
                            </linearGradient>
                        </defs>
                    </svg>

                    {/* Pie Chart Container */}
                    <div className="relative w-full flex-1 flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={attendanceSummary}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={70}
                                    outerRadius={100}
                                    dataKey="value"
                                    paddingAngle={4}
                                    cornerRadius={10}
                                >
                                    {attendanceSummary.map((_, i) => (
                                        <Cell
                                            key={i}
                                            fill={i === 0 ? "url(#presentPie)" : "url(#absentPie)"}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        borderRadius: "8px",
                                        border: "none",
                                        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>

                        {/* Total Records Label */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                            <p className="text-3xl font-bold text-gray-900">{total}</p>
                            <p className="text-gray-500 text-xs">Total Records</p>
                        </div>
                    </div>

                    {/* Legend */}
                    <div className="mt-2 flex gap-6 text-xs bg-white/80 px-4 py-1 rounded-full shadow-sm">
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "#22c55e" }} />
                            <span className="text-gray-600">Present</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "#ef4444" }} />
                            <span className="text-gray-600">Absent</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
