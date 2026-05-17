import { prisma } from "../../db/prisma.js";
import type { CreateRuleDto, UpdateRuleDto } from "./rules.schema.js";

export const rulesRepository = {
    findByProgram(programId: number) {
        return prisma.rule.findMany({
            where: { programId },
            orderBy: { priority: "asc" },
        });
    },

    findById(id: number) {
        return prisma.rule.findUnique({ where: { id } });
    },

    create(data: CreateRuleDto) {
        return prisma.rule.create({
            data: {
                programId: data.program_id,
                field: data.field,
                operator: data.operator,
                value: data.value,
                action: data.action,
                message: data.message,
                priority: data.priority,
                active: data.active,
            },
        });
    },

    update(id: number, data: UpdateRuleDto) {
        return prisma.rule.update({
            where: { id },
            data: {
                ...(data.field !== undefined && { field: data.field }),
                ...(data.operator !== undefined && { operator: data.operator }),
                ...(data.value !== undefined && { value: data.value }),
                ...(data.action !== undefined && { action: data.action }),
                ...(data.message !== undefined && { message: data.message }),
                ...(data.priority !== undefined && { priority: data.priority }),
                ...(data.active !== undefined && { active: data.active }),
            },
        });
    },

    delete(id: number) {
        return prisma.rule.delete({ where: { id } });
    },
};