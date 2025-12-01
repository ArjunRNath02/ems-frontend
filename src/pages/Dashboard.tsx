"use client";

import { useEffect, useState } from "react";
import { EmployeeService } from "@/services/employeeService";
import { AttendanceService } from "@/services/attendanceService";
import { DepartmentService } from "@/services/departmentService";
import { Card, CardContent } from "@/components/ui/card";

// Icons
import {
    Users,
    Building2,
    CheckCircle,
    XCircle,
} from "lucide-react";

export default function Dashboard() {
    const [totalEmployees, setTotalEmployees] = useState(0);
    const [presentToday, setPresentToday] = useState(0);
    const [absentToday, setAbsentToday] = useState(0);
    const [totalDepartments, setTotalDepartments] = useState(0);
    const [recentAttendance, setRecentAttendance] = useState([]);

    const loadData = async () => {
        const employees = await EmployeeService.getAllEmployees();
        const departments = await DepartmentService.getAllDepartments();
        const attendance = await AttendanceService.getAllAttendance();

        setTotalEmployees(employees.length);
        setTotalDepartments(departments.length);

        const today = new Date().toISOString().split("T")[0];
        const todayList = attendance.filter((a: any) => a.date === today);

        setPresentToday(todayList.filter((a: any) => a.status === "PRESENT").length);
        setAbsentToday(todayList.filter((a: any) => a.status === "ABSENT").length);

        setRecentAttendance(attendance.slice(0, 5));
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div className="space-y-10">

            {/* ======================
               HEADER SECTION
            ======================= */}
            <div>
                <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
                <p className="text-gray-500 mt-1">Updated employee & attendance insights</p>
            </div>


            {/* ======================
               METRICS GRID
            ======================= */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                {/* Card 1 */}
                <Card className="rounded-xl shadow-md hover:shadow-lg transition">
                    <CardContent className="p-5 flex items-center gap-4">
                        <div className="bg-blue-100 p-3 rounded-lg">
                            <Users className="text-blue-600" size={28} />
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">Total Employees</p>
                            <h2 className="text-3xl font-bold">{totalEmployees}</h2>
                        </div>
                    </CardContent>
                </Card>

                {/* Card 2 */}
                <Card className="rounded-xl shadow-md hover:shadow-lg transition">
                    <CardContent className="p-5 flex items-center gap-4">
                        <div className="bg-green-100 p-3 rounded-lg">
                            <CheckCircle className="text-green-600" size={28} />
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">Present Today</p>
                            <h2 className="text-3xl font-bold text-green-700">{presentToday}</h2>
                        </div>
                    </CardContent>
                </Card>

                {/* Card 3 */}
                <Card className="rounded-xl shadow-md hover:shadow-lg transition">
                    <CardContent className="p-5 flex items-center gap-4">
                        <div className="bg-red-100 p-3 rounded-lg">
                            <XCircle className="text-red-600" size={28} />
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">Absent Today</p>
                            <h2 className="text-3xl font-bold text-red-700">{absentToday}</h2>
                        </div>
                    </CardContent>
                </Card>

                {/* Card 4 */}
                <Card className="rounded-xl shadow-md hover:shadow-lg transition">
                    <CardContent className="p-5 flex items-center gap-4">
                        <div className="bg-purple-100 p-3 rounded-lg">
                            <Building2 className="text-purple-600" size={28} />
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">Departments</p>
                            <h2 className="text-3xl font-bold">{totalDepartments}</h2>
                        </div>
                    </CardContent>
                </Card>

            </div>


            {/* ======================
               RECENT ATTENDANCE
            ======================= */}
            <div className="mt-8">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold text-gray-800">Recent Attendance</h2>
                    <span className="text-gray-500 text-sm">Last 5 records</span>
                </div>

                <div className="mt-4 bg-white shadow-md rounded-xl overflow-hidden border">

                    <table className="w-full text-left">
                        <thead className="bg-gray-100 text-gray-600 text-sm">
                            <tr>
                                <th className="p-3">Employee</th>
                                <th className="p-3">Date</th>
                                <th className="p-3">Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {recentAttendance.map((a: any, i) => (
                                <tr
                                    key={a.id}
                                    className={`border-t ${i % 2 === 0 ? "bg-white" : "bg-gray-50"
                                        } hover:bg-gray-100 transition`}
                                >
                                    <td className="p-3 font-medium">
                                        {a.employee.firstName} {a.employee.lastName}
                                    </td>
                                    <td className="p-3">{a.date}</td>
                                    <td className="p-3">
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-semibold
                                                ${a.status === "PRESENT"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                                }`}
                                        >
                                            {a.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            </div>

        </div>
    );
}
