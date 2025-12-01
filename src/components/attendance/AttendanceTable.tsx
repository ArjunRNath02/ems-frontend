import type { Attendance } from "@/types/Attendance";
import { Badge } from "../ui/badge";


interface AttendanceTableProps {
    data: Attendance[];
    reload: () => void;
}

export default function AttendanceTable({ data }: AttendanceTableProps) {
    return (
        <div className="overflow-hidden rounded-xl border bg-white shadow-md">
            <table className="table-auto w-full text-sm">
                <thead>
                    <tr className="bg-gray-100 text-left">
                        <th className="p-3">Employee</th>
                        <th className="p-3">Date</th>
                        <th className="p-3">Status</th>
                    </tr>
                </thead>

                <tbody>
                    {data.map((a) => (
                        <tr key={a.id} className="border-t hover:bg-gray-50">
                            <td className="p-3 font-medium">
                                {a.employee?.firstName} {a.employee?.lastName}
                            </td>

                            <td className="p-3">
                                {new Date(a.date).toLocaleDateString("en-IN")}
                            </td>

                            <td className="p-3">
                                <Badge
                                    className={
                                        a.status === "PRESENT"
                                            ? "bg-green-500 hover:bg-green-600"
                                            : "bg-red-500 hover:bg-red-600"
                                    }
                                >
                                    {a.status}
                                </Badge>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
