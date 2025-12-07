"use client";

import type { FC } from "react";
import { XCircle } from "lucide-react";

interface NoDataProps {
    message?: string;
}

const NoData: FC<NoDataProps> = ({ message = "No data available" }) => {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center text-gray-400">
            <div className="p-4 bg-gray-100 rounded-full animate-pulse mb-4">
                <XCircle size={48} className="text-red-400" />
            </div>
            <p className="text-lg font-semibold">{message}</p>
            <p className="text-sm mt-1 text-gray-500">
                Try refreshing or come back later
            </p>
        </div>
    );
};

export default NoData;
