export type AttendanceStatus = "PRESENT" | "ABSENT";

export interface Attendance {
    id?: number;
    employeeId: number;
    date: string;
    status: AttendanceStatus;

    employee?: {
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        departmentName?: string;
    };
}
