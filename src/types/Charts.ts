export interface AttendanceTrend {
    date: string;
    present: number;
    absent: number;
}

export interface MonthlyAttendance {
    name: string;
    value: number;
}
