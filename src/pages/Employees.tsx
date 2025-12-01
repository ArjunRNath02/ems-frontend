"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { EmployeeService } from "@/services/employeeService";
import EmployeeFormModal from "@/components/employees/EmployeeForm";
import EmployeeTable from "@/components/employees/EmployeeTable";
import { Search, UserPlus, UsersRound } from "lucide-react";
import type { Employee } from "@/types/Employee";

export default function Employees() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [filtered, setFiltered] = useState<Employee[]>([]);
    const [search, setSearch] = useState("");

    const [modalOpen, setModalOpen] = useState(false);
    const [editData, setEditData] = useState<Employee | null>(null);

    const loadData = async () => {
        const data = await EmployeeService.getAllEmployees();
        setEmployees(data);
        setFiltered(data);
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleSearch = (val: string) => {
        setSearch(val);
        setFiltered(
            employees.filter((e) =>
                `${e.firstName} ${e.lastName}`
                    .toLowerCase()
                    .includes(val.toLowerCase())
            )
        );
    };

    const handleCreate = async (data: Employee) => {
        await EmployeeService.createEmployee(data);
        loadData();
    };

    const handleUpdate = async (data: Employee) => {
        const cleaned = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            departmentId: data.departmentId,
            role: data.role,
            status: data.status,
        };

        await EmployeeService.updateEmployee(data.id!, cleaned);
        loadData();
    };

    const handleDelete = async (id: number) => {
        await EmployeeService.deleteEmployee(id);
        loadData();
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold flex items-center gap-2">
                        <UsersRound className="text-blue-600" />
                        Employees
                    </h1>
                    <p className="text-gray-500 mt-1">
                        Manage employee records, roles & departments
                    </p>
                </div>

                <Button
                    className="flex items-center gap-2 shadow-md"
                    onClick={() => {
                        setEditData(null);
                        setModalOpen(true);
                    }}
                >
                    <UserPlus size={18} />
                    Add Employee
                </Button>
            </div>

            <div className="mb-6">
                <div className="flex items-center bg-white border rounded-xl shadow-sm px-4 py-2 w-full max-w-md">
                    <Search size={20} className="text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search employees by name..."
                        className="ml-3 w-full outline-none"
                        value={search}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-md border p-4">
                <EmployeeTable
                    data={filtered}
                    onEdit={(emp) => {
                        setEditData(emp);
                        setModalOpen(true);
                    }}
                    onDelete={handleDelete}
                />
            </div>

            <EmployeeFormModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onSubmit={editData ? handleUpdate : handleCreate}
                initial={editData}
            />
        </div>
    );
}
