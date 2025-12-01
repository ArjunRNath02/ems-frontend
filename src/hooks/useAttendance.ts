import { useEffect, useState } from "react";
import { AttendanceService } from "../services/attendanceService";
import type { Attendance } from "../types/Attendance";

export function useAttendance() {
    const [records, setRecords] = useState<Attendance[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchRecords = async () => {
        setLoading(true);
        const data = await AttendanceService.getAllAttendance();
        setRecords(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchRecords();
    }, []);

    return { records, loading, refresh: fetchRecords };
}
