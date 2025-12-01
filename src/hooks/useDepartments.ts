// src/hooks/useDepartments.ts
import { useEffect, useState } from "react";
import { DepartmentService } from "../services/departmentService";
import type { Department } from "../types/Department";

export function useDepartments() {
    const [departments, setDepartments] = useState<Department[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchDepartments = async () => {
        setLoading(true);
        const data = await DepartmentService.getAllDepartments();
        setDepartments(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchDepartments();
    }, []);

    return { departments, loading, refresh: fetchDepartments };
}
