"use client";

import type { Attendance } from "@/types/Attendance";
import { Badge } from "../ui/badge";
import NoData from "../extras/NoData";

interface AttendanceTableProps {
    data: Attendance[];
    reload?: () => void;
}

export default function AttendanceTable({ data }: AttendanceTableProps) {
    return (
        <div className="bg-white rounded-xl shadow-md border overflow-hidden">

            {/* Responsive wrapper */}
            <div className="overflow-x-auto">
                <table className="min-w-[600px] w-full text-sm">
                    <thead>
                        <tr className="bg-gray-100 text-left text-gray-600 uppercase text-xs font-semibold">
                            <th className="p-3">Employee</th>
                            <th className="p-3">Date</th>
                            <th className="p-3">Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {!data || data.length === 0 ? (
                            <tr>
                                <td colSpan={3} className="p-6 text-center">
                                    <NoData message="No attendance records found" />
                                </td>
                            </tr>
                        ) : (
                            data.map((a) => (
                                <tr
                                    key={a.id}
                                    className="border-t hover:bg-gray-50 transition-all duration-150"
                                >
                                    <td className="p-3 font-medium whitespace-nowrap">
                                        {a.employee?.firstName} {a.employee?.lastName}
                                    </td>

                                    <td className="p-3 whitespace-nowrap">
                                        {new Date(a.date).toLocaleDateString("en-IN", {
                                            weekday: "short",
                                            day: "numeric",
                                            month: "short",
                                            year: "numeric",
                                        })}
                                    </td>

                                    <td className="p-3">
                                        <Badge
                                            className={`px-3 py-1 rounded-full text-xs font-semibold ${a.status === "PRESENT"
                                                    ? "bg-green-100 text-green-800"
                                                    : "bg-red-100 text-red-800"
                                                }`}
                                        >
                                            {a.status}
                                        </Badge>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
