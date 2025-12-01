"use client";

import { Bell, Settings, User } from "lucide-react";

export default function Topbar() {
    return (
        <div className="h-16 
            backdrop-blur-md 
            border-b flex items-center justify-between 
            px-6 sticky top-0 z-30"
        >
            <h1 className="text-lg font-semibold text-gray-800 tracking-wide">
                Admin Dashboard
            </h1>

            <div className="flex items-center gap-4">

                <button className="hover:bg-gray-100 p-2 rounded-full transition">
                    <Bell size={20} className="text-gray-600" />
                </button>

                <button className="hover:bg-gray-100 p-2 rounded-full transition">
                    <Settings size={20} className="text-gray-600" />
                </button>

                <div className="flex items-center gap-3 pl-4 border-l">
                    <span className="text-gray-700 font-medium">
                        Admin
                    </span>

                    <button className="w-10 h-10 rounded-full bg-gray-200 p-1 hover:ring-2 hover:ring-gray-300 transition">
                        <User className="w-full h-full text-gray-700" />
                    </button>
                </div>
            </div>
        </div>
    );
}
