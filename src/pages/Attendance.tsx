"use client";

import { useEffect, useState } from "react";
import { AttendanceService } from "@/services/attendanceService";
import AttendanceFormModal from "@/components/attendance/AttendanceForm";
import AttendanceTable from "@/components/attendance/AttendanceTable";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Attendance() {
    const [list, setList] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);

    const loadData = async () => {
        const data = await AttendanceService.getAllAttendance();
        setList(data);
    };

    useEffect(() => { loadData(); }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 space-y-8"
        >
            {/* Header */}
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold tracking-tight">Attendance</h1>
                <Button
                    className="shadow-md hover:shadow-lg transition"
                    onClick={() => setModalOpen(true)}
                >
                    Mark Attendance
                </Button>
            </div>

            <AttendanceTable data={list} reload={loadData} />

            <AttendanceFormModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                reload={loadData}
                existingAttendance={list}
            />
        </motion.div>
    );
}
