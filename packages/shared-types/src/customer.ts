export type MaritalStatus =
    | "SINGLE"
    | "MARRIED"
    | "DIVORCED"
    | "WIDOWED";

export type Customer = {
    id: number;

    name: string;

    email?: string;

    phone?: string;

    national_id?: string;

    salary: number;

    age: number;

    marital_status?: MaritalStatus;

    employer?: string;

    job_title?: string;

    created_at?: string;

    updated_at?: string;
};