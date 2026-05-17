import { z } from "zod";

export const EmploymentTypeSchema = z.enum(["SALARIED", "SELF_EMPLOYED", "BUSINESS_OWNER", "FREELANCER"]);
export const VehicleConditionSchema = z.enum(["NEW", "USED"]);
export const ApplicationStatusSchema = z.enum(["PENDING", "APPROVED", "REJECTED", "UNDER_REVIEW"]);

export const CreateApplicationSchema = z.object({
    customer_id: z.number().int().positive(),
    vehicle_id: z.number().int().positive().optional(),
    salary: z.number().positive(),
    job_type: EmploymentTypeSchema,
    age: z.number().int().min(18).max(80).optional(),
    current_liabilities: z.number().min(0).optional(),
    brand: z.string().min(1),
    model: z.string().min(1),
    manufacturing_year: z.number().int().min(1990).max(new Date().getFullYear() + 1),
    condition: VehicleConditionSchema,
    price: z.number().positive(),
    requested_down_payment: z.number().min(0),
});

export const UpdateApplicationStatusSchema = z.object({
    status: ApplicationStatusSchema,
});

export const ApplicationIdParamSchema = z.object({
    id: z.coerce.number().int().positive(),
});

export type CreateApplicationDto = z.infer<typeof CreateApplicationSchema>;
export type UpdateApplicationStatusDto = z.infer<typeof UpdateApplicationStatusSchema>;
export type ApplicationIdParam = z.infer<typeof ApplicationIdParamSchema>;