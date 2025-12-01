"use client";

import { NavLink } from "react-router-dom";
import {
    LayoutDashboard,
    Users,
    Building2,
    CalendarCheck,
    Menu,
    X,
} from "lucide-react";
import { motion } from "framer-motion";
import { images } from "@/constants/images";

export default function Sidebar({ open, setOpen }: any) {
    const menu = [
        { name: "Dashboard", icon: LayoutDashboard, path: "/" },
        { name: "Employees", icon: Users, path: "/employees" },
        { name: "Departments", icon: Building2, path: "/departments" },
        { name: "Attendance", icon: CalendarCheck, path: "/attendance" },
    ];

    return (
        <motion.aside
            animate={{ width: open ? 260 : 95 }}
            transition={{ type: "spring", stiffness: 160, damping: 20 }}
            className="fixed left-0 top-0 h-screen bg-white border-r shadow-lg z-50 flex flex-col rounded-r-2xl"
        >
            {/* Header */}
            <div
                className={`flex items-center border-b px-4 ${open ? "justify-between h-20" : "flex-col py-4 gap-2"
                    }`}
            >
                {open ? (
                    <img src={images.logo} className="h-14 w-44 object-cover" />
                ) : (
                    <img src={images.logoC} className="h-12 w-16 object-contain" />
                )}

                <button
                    onClick={() => setOpen(!open)}
                    className="p-2 rounded-lg hover:bg-gray-200 transition"
                >
                    {open ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>

            {/* Menu */}
            <nav className="flex flex-col gap-2 mt-4">
                {menu.map((item) => {
                    const Icon = item.icon;
                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-4 px-4 py-3 rounded-lg mx-2
                                text-gray-700 hover:bg-gray-100 transition
                                ${isActive ? "bg-gray-200 font-semibold" : ""}`
                            }
                        >
                            <div className="flex items-center justify-center w-10 h-10">
                                <Icon size={22} />
                            </div>

                            {open && (
                                <motion.span
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {item.name}
                                </motion.span>
                            )}
                        </NavLink>
                    );
                })}
            </nav>
        </motion.aside>
    );
}
