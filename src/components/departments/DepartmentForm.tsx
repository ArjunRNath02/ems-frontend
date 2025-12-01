"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import type { Employee } from "@/types/Employee";
import type { Department } from "@/types/Department";
import { EmployeeService } from "@/services/employeeService";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface Props {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: Department) => void;
    initial?: Department | null;
}

export default function DepartmentFormModal({
    open,
    onClose,
    onSubmit,
    initial,
}: Props) {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [hodList, setHodList] = useState<Employee[]>([]);

    const [form, setForm] = useState<Department>({
        name: "",
        description: "",
        headOfDepartment: 0,
    });

    useEffect(() => {
        EmployeeService.getAllEmployees().then(setEmployees);
    }, []);

    // Filter HOD list based on selected dept or include current one
    useEffect(() => {
        if (initial) {
            setForm(initial);

            const deptEmployees = employees.filter(
                (e) => e.departmentId === initial.id
            );

            const currentHOD = employees.find(
                (e) => e.id === initial.headOfDepartment
            );

            if (currentHOD && !deptEmployees.some((x) => x.id === currentHOD.id)) {
                deptEmployees.push(currentHOD);
            }

            setHodList(deptEmployees);
        } else {
            setForm({ name: "", description: "", headOfDepartment: 0 });
            setHodList([]);
        }
    }, [initial, employees]);

    const handleSubmit = () => {
        if (!form.name || form.name.trim() === "") {
            alert("Department Name is required");
            return;
        }

        onSubmit(form);
        onClose();
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-lg rounded-xl p-0 overflow-hidden">

                {/* Header */}
                <DialogHeader className="p-6 pb-2">
                    <DialogTitle className="text-2xl font-semibold">
                        {initial ? "Edit Department" : "Create Department"}
                    </DialogTitle>
                </DialogHeader>

                {/* Animated Body */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className="p-6 pt-0 space-y-5"
                >
                    {/* Name */}
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">
                            Department Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            className="input w-full mt-1 border rounded-lg p-2"
                            placeholder="Enter Department Name"
                            name="name"
                            value={form.name}
                            onChange={(e) =>
                                setForm({ ...form, [e.target.name]: e.target.value })
                            }
                        />
                    </div>

                    {/* Description */}
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">
                            Description
                        </label>
                        <textarea
                            className="input w-full mt-1 border rounded-lg p-2 h-20"
                            placeholder="Short description (optional)"
                            name="description"
                            value={form.description}
                            onChange={(e) =>
                                setForm({ ...form, [e.target.name]: e.target.value })
                            }
                        />
                    </div>

                    {/* HOD */}
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">
                            Head of Department
                        </label>

                        <select
                            className="input w-full mt-1 border rounded-lg p-2"
                            value={form.headOfDepartment}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    headOfDepartment: Number(e.target.value),
                                })
                            }
                        >
                            <option value="">Select HOD</option>

                            {hodList.length === 0 && (
                                <option disabled>No employees in this department</option>
                            )}

                            {hodList.map((emp) => (
                                <option key={emp.id} value={emp.id}>
                                    {emp.firstName} {emp.lastName}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Submit */}
                    <Button
                        onClick={handleSubmit}
                        className="w-full py-3 text-md mt-2 rounded-lg"
                    >
                        {initial ? "Update Department" : "Create Department"}
                    </Button>
                </motion.div>
            </DialogContent>
        </Dialog>
    );
}
