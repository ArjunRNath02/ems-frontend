import { EmployeeService } from "@/services/employeeService";
import type { Employee } from "@/types/Employee";
import { useEffect, useState } from "react";

export function useEmployees() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchEmployees = async () => {
        setLoading(true);
        const data = await EmployeeService.getAllEmployees();
        setEmployees(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    return { employees, loading, refresh: fetchEmployees };
}


