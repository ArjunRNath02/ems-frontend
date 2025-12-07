import NoData from "../extras/NoData";

export default function RecentAttendanceTable({ data }: any) {
    return (
        <div className="mt-12 bg-white shadow rounded-xl overflow-hidden border">
            <h2 className="text-xl font-semibold p-4">Recent Attendance</h2>

            <table className="w-full text-left">
                <thead className="bg-gray-100 text-gray-600 text-sm">
                    <tr>
                        <th className="p-3">Employee</th>
                        <th className="p-3">Date</th>
                        <th className="p-3">Status</th>
                    </tr>
                </thead>

                <tbody>
                    {!data || data.length === 0 ? (
                        <tr>
                            <td colSpan={3} className="p-6">
                                <NoData message="No recent attendance" />
                            </td>
                        </tr>
                    ) : (
                        data.map((a: any, i: number) => (
                            <tr
                                key={i}
                                className={`border-t ${i % 2 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}
                            >
                                <td className="p-3 font-medium">
                                    {a.employee.firstName} {a.employee.lastName}
                                </td>
                                <td className="p-3">{a.date}</td>
                                <td className="p-3">
                                    <span className={`px-3 py-1 rounded-full text-sm font-semibold
                                    ${a.status === "PRESENT"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                        }`}
                                    >
                                        {a.status}
                                    </span>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
