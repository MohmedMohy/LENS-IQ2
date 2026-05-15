export type ProgramStatus =
    | "ACTIVE"
    | "INACTIVE";

export type Program = {
    id: number;

    bank_id: number;

    name: string;

    description?: string;

    min_salary: number;

    max_dti: number;

    min_down_payment_percent: number;

    max_vehicle_age: number;

    interest_rate: number;

    min_term_months: number;

    max_term_months: number;

    status: ProgramStatus;

    created_at?: string;

    updated_at?: string;
};