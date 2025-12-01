import { Dialog, DialogContent } from "@/components/ui/dialog";
import { AttendanceService } from "@/services/attendanceService";
import { EmployeeService } from "@/services/employeeService";
import type { AttendanceStatus, Attendance } from "@/types/Attendance";
import type { Employee } from "@/types/Employee";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface AttendanceFormProps {
    open: boolean;
    onClose: () => void;
    reload: () => void;
    existingAttendance?: Attendance[];
}

export default function AttendanceFormModal({
    open,
    onClose,
    reload,
    existingAttendance = [],
}: AttendanceFormProps) {

    const [employees, setEmployees] = useState<Employee[]>([]);
    const [employeeId, setEmployeeId] = useState<number | "">("");
    const [date, setDate] = useState("");
    const [status, setStatus] = useState<AttendanceStatus>("PRESENT");
    const [error, setError] = useState("");

    useEffect(() => {
        EmployeeService.getAllEmployees().then(setEmployees);
        setError("");
    }, [open]);

    const handleSubmit = async () => {
        setError("");

        if (!employeeId || !date) {
            setError("Please select employee and date.");
            return;
        }

        const alreadyExists = existingAttendance.some(
            (a) =>
                a.employee?.id === Number(employeeId) &&
                a.date === date
        );

        if (alreadyExists) {
            setError("Attendance for this employee on this date already exists.");
            return;
        }

        await AttendanceService.markAttendance({
            employeeId: Number(employeeId),
            date,
            status,
        });

        reload();
        onClose();
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-md space-y-4">
                <h2 className="text-xl font-semibold mb-2">Mark Attendance</h2>

                {error && (
                    <div className="bg-red-100 text-red-700 p-2 rounded">
                        {error}
                    </div>
                )}

                <div>
                    <label className="font-medium">Employee</label>
                    <select
                        className="w-full border p-2 rounded mt-1"
                        value={employeeId}
                        onChange={(e) => setEmployeeId(Number(e.target.value))}
                    >
                        <option value="">Select Employee</option>
                        {employees.map((e) => (
                            <option key={e.id} value={e.id}>
                                {e.firstName} {e.lastName}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="font-medium">Date</label>
                    <input
                        type="date"
                        className="w-full border p-2 rounded mt-1"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>

                <div>
                    <label className="font-medium">Status</label>
                    <select
                        className="w-full border p-2 rounded mt-1"
                        value={status}
                        onChange={(e) => setStatus(e.target.value as AttendanceStatus)}
                    >
                        <option value="PRESENT">Present</option>
                        <option value="ABSENT">Absent</option>
                    </select>
                </div>

                <Button className="w-full" onClick={handleSubmit}>
                    Submit
                </Button>
            </DialogContent>
        </Dialog>
    );
}
