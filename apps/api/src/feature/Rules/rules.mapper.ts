import type { Rule as PrismaRule } from "@prisma/client";
import type { Rule, RuleOperator, RuleAction } from "@lens/shared-types";

export function mapRuleToDto(r: PrismaRule): Rule {
    return {
        id: r.id,
        program_id: r.programId,
        field: r.field,
        operator: r.operator as RuleOperator,
        value: r.value,
        action: r.action as RuleAction,
        message: r.message,
        priority: r.priority ?? undefined,
        active: r.active,
        created_at: r.createdAt.toISOString(),
        updated_at: r.updatedAt.toISOString(),
    };
}