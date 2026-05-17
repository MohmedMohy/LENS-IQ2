import type { Program as PrismaProgram } from "@prisma/client";
import type { Program } from "@lens/shared-types";

export function mapProgramToDto(p: PrismaProgram): Program {
    return {
        id: p.id,
        bank_id: p.bankId,
        name: p.name,
        description: p.description ?? undefined,
        min_salary: p.minSalary,
        max_dti: p.maxDti,
        min_down_payment_percent: p.minDownPaymentPercent,
        max_vehicle_age: p.maxVehicleAge,
        interest_rate: p.interestRate,
        min_term_months: p.minTermMonths,
        max_term_months: p.maxTermMonths,
        status: p.status as Program["status"],
        created_at: p.createdAt.toISOString(),
        updated_at: p.updatedAt.toISOString(),
    };
}