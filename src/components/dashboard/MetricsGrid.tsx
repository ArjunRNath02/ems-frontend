import { Card, CardContent } from "@/components/ui/card";
import { Users, Building2, CheckCircle, XCircle } from "lucide-react";

export default function MetricsGrid({ metrics }: any) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            <MetricCard
                icon={<Users className="text-blue-600" size={28} />}
                title="Total Employees"
                value={metrics.totalEmployees}
                color="blue"
            />

            <MetricCard
                icon={<CheckCircle className="text-green-600" size={28} />}
                title="Present Today"
                value={metrics.presentToday}
                color="green"
            />

            <MetricCard
                icon={<XCircle className="text-red-600" size={28} />}
                title="Absent Today"
                value={metrics.absentToday}
                color="red"
            />

            <MetricCard
                icon={<Building2 className="text-purple-600" size={28} />}
                title="Departments"
                value={metrics.totalDepartments}
                color="purple"
            />
        </div>
    );
}

function MetricCard({ icon, title, value, color }: any) {
    return (
        <Card className="rounded-xl shadow hover:shadow-lg transition bg-white border">
            <CardContent className="p-5 flex items-center gap-4">
                <div className={`p-3 rounded-lg bg-${color}-100`}>
                    {icon}
                </div>
                <div>
                    <p className="text-gray-500 text-sm">{title}</p>
                    <h2 className="text-3xl font-bold">{value}</h2>
                </div>
            </CardContent>
        </Card>
    );
}
