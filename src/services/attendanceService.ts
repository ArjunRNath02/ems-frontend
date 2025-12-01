// src/services/attendanceService.ts
import API from "./api";
import type { Attendance } from "../types/Attendance";
import { EmployeeService } from "./employeeService";

export const AttendanceService = {
    markAttendance: async (data: Attendance) => {
        const res = await API.post("/attendance", data);
        return res.data;
    },

    getAttendanceById: async (id: number) => {
        const res = await API.get(`/attendance/${id}`);
        return res.data;
    },

    getAttendanceByEmployee: async (employeeId: number) => {
        const res = await API.get(`/attendance/employee/${employeeId}`);
        return res.data;
    },

    getAttendanceByDate: async (date: string) => {
        const res = await API.get(`/attendance/date/${date}`);
        return res.data;
    },

    getAllAttendance: async () => {
        const res = await API.get("/attendance");
        const attendanceList = res.data;
        const employees = await EmployeeService.getAllEmployees();

        return attendanceList.map((a: any) => ({
            ...a,
            employee: employees.find((e: { id: number; }) => e.id === a.employeeId) || null
        }));
    },

    updateAttendance: async (id: number, data: Attendance) => {
        const res = await API.put(`/attendance/${id}`, data);
        return res.data;
    },

    deleteAttendance: async (id: number) => {
        const res = await API.delete(`/attendance/${id}`);
        return res.data;
    }
};
