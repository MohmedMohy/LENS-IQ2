import type { VehicleCondition }
    from "./vehicle";

export type ApplicationStatus =
    | "PENDING"
    | "APPROVED"
    | "REJECTED"
    | "UNDER_REVIEW";

export type EmploymentType =
    | "SALARIED"
    | "SELF_EMPLOYED"
    | "BUSINESS_OWNER"
    | "FREELANCER";



export type Application = {
    id: number;

    customer_id: number;

    customer_name: string;

    salary: number;

    job_type: EmploymentType;

    age?: number;

    current_liabilities?: number;

    vehicle_id?: number;

    brand: string;

    model: string;

    manufacturing_year: number;

    condition: VehicleCondition;

    price: number;

    requested_down_payment: number;

    status: ApplicationStatus;

    created_at?: string;

    updated_at?: string;
};