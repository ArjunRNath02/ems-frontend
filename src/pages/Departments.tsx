"use client";

import { useEffect, useState } from "react";
import DepartmentFormModal from "@/components/departments/DepartmentForm";
import DepartmentTable from "@/components/departments/DepartmentTable";
import { Button } from "@/components/ui/button";
import { DepartmentService } from "@/services/departmentService";
import type { Department } from "@/types/Department";
import { Search, Plus } from "lucide-react";
import { motion } from "framer-motion";

export default function Departments() {
    const [departments, setDepartments] = useState<Department[]>([]);
    const [filtered, setFiltered] = useState<Department[]>([]);
    const [search, setSearch] = useState("");

    const [modalOpen, setModalOpen] = useState(false);
    const [editData, setEditData] = useState<Department | null>(null);

    const loadData = async () => {
        const data = await DepartmentService.getAllDepartments();
        setDepartments(data);
        setFiltered(data);
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleSearch = (val: string) => {
        setSearch(val);
        setFiltered(
            departments.filter((d) =>
                d.name.toLowerCase().includes(val.toLowerCase())
            )
        );
    };

    const handleCreate = async (data: Department) => {
        await DepartmentService.createDepartment(data);
        loadData();
    };

    const handleUpdate = async (data: Department) => {
        const cleaned = {
            name: data.name,
            description: data.description,
            headOfDepartment: data.headOfDepartment,
        };

        await DepartmentService.updateDepartment(data.id!, cleaned);
        loadData();
    };

    const handleDelete = async (id: number) => {
        await DepartmentService.deleteDepartment(id);
        loadData();
    };

    return (
        <div className="p-6 space-y-6">

            {/* Header Section */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Departments</h1>
                    <p className="text-gray-500 text-sm mt-1">
                        Manage departments, assign HODs and update organizational structure.
                    </p>
                </div>

                <Button
                    className="flex items-center gap-2"
                    onClick={() => {
                        setEditData(null);
                        setModalOpen(true);
                    }}
                >
                    <Plus size={18} />
                    Add Department
                </Button>
            </div>

            {/* Search bar */}
            <div className="bg-white shadow-sm rounded-xl p-4 flex items-center gap-3 border">
                <Search size={20} className="text-gray-400" />
                <input
                    type="text"
                    placeholder="Search departments..."
                    className="w-full outline-none text-gray-700"
                    value={search}
                    onChange={(e) => handleSearch(e.target.value)}
                />
            </div>

            {/* Table Section */}
            <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="bg-white rounded-xl shadow-sm border p-4"
            >
                <DepartmentTable
                    data={filtered}
                    onEdit={(dept) => {
                        setEditData(dept);
                        setModalOpen(true);
                    }}
                    onDelete={handleDelete}
                />
            </motion.div>

            {/* Modal */}
            <DepartmentFormModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onSubmit={editData ? handleUpdate : handleCreate}
                initial={editData}
            />
        </div>
    );
}
