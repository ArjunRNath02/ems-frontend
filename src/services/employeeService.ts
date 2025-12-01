// src/services/employeeService.ts
import API from "./api";
import type { Employee } from "../types/Employee";

function buildPayload(data: Employee) {
    return {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        role: data.role,
        status: data.status,
        department: data.departmentId ? { id: data.departmentId } : null
    };
}

export const EmployeeService = {
    // CREATE
    createEmployee: async (data: Employee) => {
        const payload = buildPayload(data);
        const res = await API.post("/employees", payload);
        return res.data;
    },

    // GET ALL
    getAllEmployees: async () => {
        const res = await API.get("/employees");

        return res.data.map((e: any) => ({
            id: e.id,
            firstName: e.firstName,
            lastName: e.lastName,
            email: e.email,
            departmentId: e.department?.id ?? null,
            departmentName: e.department?.name ?? "—",
            role: e.role,
            status: e.status,
            createdAt: new Date(e.createdAt),
            updatedAt: new Date(e.updatedAt),
        }));
    },

    // GET BY ID
    getEmployeeById: async (id: number) => {
        const res = await API.get(`/employees/${id}`);
        return res.data;
    },

    // UPDATE
    updateEmployee: async (id: number, data: Employee) => {
        const payload = buildPayload(data);
        const res = await API.put(`/employees/${id}`, payload);
        return res.data;
    },

    // DELETE
    deleteEmployee: async (id: number) => {
        const res = await API.delete(`/employees/${id}`);
        return res.data;
    }
};
