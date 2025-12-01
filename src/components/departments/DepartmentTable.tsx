import type { Department } from "@/types/Department";
import { Pencil, Trash2 } from "lucide-react";

interface Props {
    data: Department[];
    onEdit: (dept: Department) => void;
    onDelete: (id: number) => void;
}

export default function DepartmentTable({ data, onEdit, onDelete }: Props) {
    return (
        <div className="bg-white shadow-lg rounded-xl border border-gray-100">
            <table className="w-full text-left">
                {/* Header */}
                <thead>
                    <tr className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wide">
                        <th className="p-4">ID</th>
                        <th className="p-4">Department</th>
                        <th className="p-4">Description</th>
                        <th className="p-4">Head of Department</th>
                        <th className="p-4 text-right">Actions</th>
                    </tr>
                </thead>

                {/* Body */}
                <tbody className="text-gray-700">
                    {data.length === 0 && (
                        <tr>
                            <td
                                colSpan={5}
                                className="p-6 text-center text-gray-400 text-sm"
                            >
                                No departments found.
                            </td>
                        </tr>
                    )}

                    {data.map((dept) => (
                        <tr
                            key={dept.id}
                            className="border-t hover:bg-gray-50 transition-all duration-150"
                        >
                            <td className="p-4 font-medium text-gray-800">{dept.id}</td>

                            <td className="p-4 font-semibold">{dept.name}</td>

                            <td className="p-4 text-gray-600">
                                {dept.description || "—"}
                            </td>

                            <td className="p-4">
                                {dept.hodName ? (
                                    <span className="inline-flex items-center px-3 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
                                        {dept.hodName}
                                    </span>
                                ) : (
                                    <span className="text-gray-400">No HOD</span>
                                )}
                            </td>

                            <td className="p-4">
                                <div className="flex justify-end gap-3">
                                    {/* Edit Button */}
                                    <button
                                        className="p-2 rounded-lg hover:bg-blue-50 text-blue-600 transition"
                                        onClick={() => onEdit(dept)}
                                    >
                                        <Pencil size={18} />
                                    </button>

                                    {/* Delete Button */}
                                    <button
                                        className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition"
                                        onClick={() => onDelete(dept.id!)}
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
