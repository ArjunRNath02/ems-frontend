// src/services/departmentService.ts
import API from "./api";
import type { Department } from "../types/Department";
import { EmployeeService } from "./employeeService";

export const DepartmentService = {
    createDepartment: async (data: Department) => {
        const res = await API.post("/departments", data);
        return res.data;
    },

    getAllDepartments: async () => {
        const res = await API.get("/departments");
        const departments: Department[] = res.data;

        const employees = await EmployeeService.getAllEmployees();

        return departments.map((d: Department) => {
            const hod = employees.find((e: { id: number | undefined; }) => e.id === d.headOfDepartment);

            return {
                ...d,
                hodName: hod
                    ? `${hod.firstName} ${hod.lastName}`
                    : "-"
            };
        });
    },

    getDepartmentById: async (id: number) => {
        const res = await API.get(`/departments/${id}`);
        return res.data;
    },

    updateDepartment: async (id: number, data: Department) => {
        const res = await API.put(`/departments/${id}`, data);
        return res.data;
    },

    deleteDepartment: async (id: number) => {
        const res = await API.delete(`/departments/${id}`);
        return res.data;
    }
};
