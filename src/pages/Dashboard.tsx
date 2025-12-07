"use client";

import { lazy, Suspense, useEffect, useState } from "react";

import { EmployeeService } from "@/services/employeeService";
import { AttendanceService } from "@/services/attendanceService";
import { DepartmentService } from "@/services/departmentService";
import type { AttendanceTrend } from "@/types/Charts";

const AttendanceTrendChart = lazy(() => import("@/components/dashboard/AttendanceTrendChart"));
const MonthlyEmployeeAttendance = lazy(() => import("@/components/dashboard/MonthlyEmployeeAttendance"));
const RecentAttendanceTable = lazy(() => import("@/components/dashboard/RecentAttendanceTable"));
const MetricsGrid = lazy(() => import("@/components/dashboard/MetricsGrid"));


export default function Dashboard() {

    const [metrics, setMetrics] = useState({
        totalEmployees: 0,
        presentToday: 0,
        absentToday: 0,
        totalDepartments: 0,
    });

    const [attendanceTrend, setAttendanceTrend] = useState<AttendanceTrend[]>([]);
    const [recentAttendance, setRecentAttendance] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadData = async () => {
        setLoading(true);
        try {
            const employees = await EmployeeService.getAllEmployees();
            const departments = await DepartmentService.getAllDepartments();
            const attendance = await AttendanceService.getAllAttendance();

            const today = new Date().toISOString().split("T")[0];
            const todayList = attendance.filter((a: any) => a.date === today);

            // METRICS
            setMetrics({
                totalEmployees: employees.length,
                presentToday: todayList.filter((a: any) => a.status === "PRESENT").length,
                absentToday: todayList.filter((a: any) => a.status === "ABSENT").length,
                totalDepartments: departments.length,
            });

            // LAST 7 DAYS TREND
            const last7 = [...Array(7)].map((_, i) => {
                const d = new Date();
                d.setDate(d.getDate() - i);
                const ds = d.toISOString().split("T")[0];

                const items = attendance.filter((a: any) => a.date === ds);

                return {
                    date: d.toLocaleDateString("en-US", { weekday: "short" }),
                    present: items.filter((x: any) => x.status === "PRESENT").length,
                    absent: items.filter((x: any) => x.status === "ABSENT").length,
                };
            }).reverse();

            setAttendanceTrend(last7);

            // RECENT 5 ATTENDANCE
            setRecentAttendance(attendance.slice(0, 5));
        } catch (err) {
            alert(`Error: ${err}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div className="space-y-12">

            <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
            <Suspense fallback={<div className="text-gray-500">Loading dashboard components...</div>}>
                {loading ? (
                    <div className="text-gray-500">Loading data...</div>
                ) : (
                    <>
                        <MetricsGrid metrics={metrics} />
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <AttendanceTrendChart data={attendanceTrend} />
                            <MonthlyEmployeeAttendance />
                        </div>
                        <RecentAttendanceTable data={recentAttendance} />
                    </>
                )}
            </Suspense>
        </div>
    );
}
