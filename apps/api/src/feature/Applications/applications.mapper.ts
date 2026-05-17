import type { Application as PrismaApplication } from "@prisma/client";
import type { Application, Application as SharedApplication } from "@lens/shared-types";

export function mapApplicationToEngineInput(a: PrismaApplication): Application {
    return {
        id: a.id,
        customer_id: a.customerId,
        customer_name: "",          // enriched separately when needed
        salary: a.salary,
        job_type: a.jobType as SharedApplication["job_type"],
        age: a.age ?? undefined,
        current_liabilities: a.currentLiabilities ?? undefined,
        vehicle_id: a.vehicleId ?? undefined,
        brand: a.brand,
        model: a.model,
        manufacturing_year: a.manufacturingYear,
        condition: a.condition as SharedApplication["condition"],
        price: a.price,
        requested_down_payment: a.requestedDownPayment,
        status: a.status as SharedApplication["status"],
        created_at: a.createdAt.toISOString(),
        updated_at: a.updatedAt.toISOString(),
    };
}

export function mapApplicationToDto(a: PrismaApplication): SharedApplication {
    return mapApplicationToEngineInput(a);
}