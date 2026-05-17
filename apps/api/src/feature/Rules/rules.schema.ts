import { z } from "zod";

export const RuleOperatorSchema = z.enum([">", "<", ">=", "<=", "=", "!="]);
export const RuleActionSchema = z.enum(["REJECT", "CONDITIONAL", "WARNING"]);

export const CreateRuleSchema = z.object({
    program_id: z.number().int().positive(),
    field: z.string().min(1),
    operator: RuleOperatorSchema,
    value: z.union([z.string(), z.number()]).transform(String),
    action: RuleActionSchema,
    message: z.string().min(1),
    priority: z.number().int().min(0).optional(),
    active: z.boolean().default(true),
});

export const UpdateRuleSchema = CreateRuleSchema.partial().omit({ program_id: true });

export const RuleIdParamSchema = z.object({
    id: z.coerce.number().int().positive(),
});

export type CreateRuleDto = z.infer<typeof CreateRuleSchema>;
export type UpdateRuleDto = z.infer<typeof UpdateRuleSchema>;
export type RuleIdParam = z.infer<typeof RuleIdParamSchema>;