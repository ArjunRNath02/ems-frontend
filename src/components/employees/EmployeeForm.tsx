"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import type { Employee } from "@/types/Employee";
import { Button } from "@/components/ui/button";
import { DepartmentService } from "@/services/departmentService";
import type { Department } from "@/types/Department";
import { motion } from "framer-motion";

interface Props {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: Employee) => void;
    initial?: Employee | null;
}

export default function EmployeeFormModal({
    open,
    onClose,
    onSubmit,
    initial,
}: Props) {
    const [departments, setDepartments] = useState<Department[]>([]);
    const [form, setForm] = useState<Employee>({
        firstName: "",
        lastName: "",
        email: "",
        departmentId: 0,
        role: "",
        status: "ACTIVE",
    });

    useEffect(() => {
        DepartmentService.getAllDepartments().then(setDepartments);
    }, []);

    useEffect(() => {
        if (initial) setForm(initial);
    }, [initial]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        onSubmit(form);
        onClose();
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-xl px-8 rounded-2xl shadow-lg bg-white border">
                <DialogHeader className="mb-2">
                    <DialogTitle className="text-2xl font-bold tracking-wide">
                        {initial ? "Edit Employee" : "Add Employee"}
                    </DialogTitle>
                </DialogHeader>

                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-6"
                >
                    <div className="bg-gray-50 p-5 rounded-xl shadow-sm border">
                        <h3 className="font-semibold text-gray-700 mb-3">
                            Personal Information
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm text-gray-600">First Name</label>
                                <input
                                    className="input w-full mt-1 py-2 px-5 bg-white rounded-2xl border"
                                    placeholder="Enter First Name"
                                    name="firstName"
                                    value={form.firstName}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label className="text-sm text-gray-600">Last Name</label>
                                <input
                                    className="input w-full mt-1 py-2 px-5 bg-white rounded-2xl border"
                                    placeholder="Enter Last Name"
                                    name="lastName"
                                    value={form.lastName}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="mt-4">
                            <label className="text-sm text-gray-600">Email</label>
                            <input
                                className="input w-full mt-1 py-2 px-5 bg-white rounded-2xl border"
                                placeholder="Enter Email Address"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="bg-gray-50 p-5 rounded-xl shadow-sm border">
                        <h3 className="font-semibold text-gray-700 mb-3">
                            Work Details
                        </h3>

                        <div className="mb-4">
                            <label className="text-sm text-gray-600">Department</label>
                            <select
                                className="input w-full mt-1 py-2 px-5 bg-white rounded-2xl border"
                                value={form.departmentId}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        departmentId: Number(e.target.value),
                                    })
                                }
                            >
                                <option value="">Select Department</option>
                                {departments.map((d) => (
                                    <option key={d.id} value={d.id}>
                                        {d.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm text-gray-600">Role</label>
                                <input
                                    className="input w-full mt-1 py-2 px-5 bg-white rounded-2xl border"
                                    placeholder="Eg: Developer, Designer"
                                    name="role"
                                    value={form.role}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label className="text-sm text-gray-600">Status</label>
                                <select
                                    className="input w-full mt-1 py-2 px-5 bg-white rounded-2xl border"
                                    value={form.status}
                                    onChange={(e) =>
                                        setForm({ ...form, status: e.target.value })
                                    }
                                >
                                    <option value="ACTIVE">ACTIVE</option>
                                    <option value="INACTIVE">INACTIVE</option>
                                    <option value="ON_LEAVE">ON_LEAVE</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <Button className="w-full h-12 text-lg font-medium" onClick={handleSubmit}>
                        {initial ? "Update Employee" : "Create Employee"}
                    </Button>
                </motion.div>
            </DialogContent>
        </Dialog>
    );
}
