import { z } from "zod";

export const ProgramStatusSchema = z.enum(["ACTIVE", "INACTIVE"]);

export const CreateProgramSchema = z.object({
    bank_id: z.number().int().positive(),
    name: z.string().min(1).max(255),
    description: z.string().max(1000).optional(),
    min_salary: z.number().positive(),
    max_dti: z.number().min(0).max(100),
    min_down_payment_percent: z.number().min(0).max(100),
    max_vehicle_age: z.number().int().min(0),
    interest_rate: z.number().positive(),
    min_term_months: z.number().int().positive(),
    max_term_months: z.number().int().positive(),
    status: ProgramStatusSchema.default("ACTIVE"),
}).refine(
    d => d.min_term_months <= d.max_term_months,
    { message: "min_term_months must be <= max_term_months", path: ["min_term_months"] }
);

export const UpdateProgramSchema = CreateProgramSchema.partial().omit({ bank_id: true });

export const ProgramIdParamSchema = z.object({
    id: z.coerce.number().int().positive(),
});

export type CreateProgramDto = z.infer<typeof CreateProgramSchema>;
export type UpdateProgramDto = z.infer<typeof UpdateProgramSchema>;
export type ProgramIdParam = z.infer<typeof ProgramIdParamSchema>;