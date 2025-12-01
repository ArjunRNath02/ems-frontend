export interface Employee {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    departmentId?: number;
    departmentName?: string;
    role: string;
    status: string;
    createdAt?: Date;
    updatedAt?: Date;
}