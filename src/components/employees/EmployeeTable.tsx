"use client";

import type { Employee } from "@/types/Employee";
import { Pencil, Trash2 } from "lucide-react";

interface Props {
    data: Employee[];
    onEdit: (emp: Employee) => void;
    onDelete: (id: number) => void;
}

export default function EmployeeTable({ data, onEdit, onDelete }: Props) {
    return (
        <div className="bg-white rounded-xl shadow-md border overflow-hidden">

            {/* Table Header */}
            <div className="px-6 py-4 border-b bg-gray-50">
                <h2 className="text-lg font-semibold text-gray-700">Employee List</h2>
            </div>

            <table className="w-full">
                <thead>
                    <tr className="text-left text-gray-500 text-sm bg-gray-50 border-b">
                        <th className="py-3 px-6">#</th>
                        <th className="py-3 px-6">Employee</th>
                        <th className="py-3 px-6">Email</th>
                        <th className="py-3 px-6">Department</th>
                        <th className="py-3 px-6">Role</th>
                        <th className="py-3 px-6">Status</th>
                        <th className="py-3 px-6 text-right">Actions</th>
                    </tr>
                </thead>

                <tbody className="divide-y">
                    {data.map((emp, index) => (
                        <tr
                            key={emp.id}
                            className="hover:bg-gray-50 transition-all duration-150"
                        >
                            <td className="py-4 px-6 text-gray-700 font-medium">
                                {index + 1}
                            </td>

                            {/* Employee Name */}
                            <td className="py-4 px-6 font-medium text-gray-800">
                                {emp.firstName} {emp.lastName}
                            </td>

                            {/* Email */}
                            <td className="py-4 px-6 text-gray-600">{emp.email}</td>

                            {/* Department */}
                            <td className="py-4 px-6">
                                <span className="px-2 py-1 rounded-md bg-blue-100 text-blue-700 text-xs font-medium">
                                    {emp.departmentName || "—"}
                                </span>
                            </td>

                            {/* Role */}
                            <td className="py-4 px-6 text-gray-700">{emp.role}</td>

                            {/* Status Badge */}
                            <td className="py-4 px-6">
                                <span
                                    className={`
                                        px-3 py-1 rounded-full text-xs font-semibold
                                        ${emp.status === "ACTIVE"
                                            ? "bg-green-100 text-green-700"
                                            : emp.status === "INACTIVE"
                                                ? "bg-gray-200 text-gray-700"
                                                : "bg-yellow-100 text-yellow-700"
                                        }
                                    `}
                                >
                                    {emp.status}
                                </span>
                            </td>

                            {/* Action Buttons */}
                            <td className="py-4 px-6 text-right flex items-center gap-3 justify-end">

                                <button
                                    onClick={() => onEdit(emp)}
                                    className="p-2 rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                                >
                                    <Pencil size={18} />
                                </button>

                                <button
                                    onClick={() => onDelete(emp.id!)}
                                    className="p-2 rounded-md bg-red-50 text-red-600 hover:bg-red-100 transition"
                                >
                                    <Trash2 size={18} />
                                </button>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
