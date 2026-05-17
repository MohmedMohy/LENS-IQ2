import { prisma } from "../../db/prisma.js";
import type { CreateProgramDto, UpdateProgramDto } from "./programs.schema.js";

export const programsRepository = {
    findAll(bankId?: number) {
        return prisma.program.findMany({
            where: bankId ? { bankId } : undefined,
            orderBy: { createdAt: "desc" },
        });
    },

    findById(id: number) {
        return prisma.program.findUnique({ where: { id } });
    },

    findByIdWithRules(id: number) {
        return prisma.program.findUnique({
            where: { id },
            include: { rules: { where: { active: true }, orderBy: { priority: "asc" } } },
        });
    },

    findActiveByBank(bankId: number) {
        return prisma.program.findMany({
            where: { bankId, status: "ACTIVE" },
            include: { rules: { where: { active: true } } },
        });
    },

    create(data: CreateProgramDto) {
        return prisma.program.create({
            data: {
                bankId: data.bank_id,
                name: data.name,
                description: data.description,
                minSalary: data.min_salary,
                maxDti: data.max_dti,
                minDownPaymentPercent: data.min_down_payment_percent,
                maxVehicleAge: data.max_vehicle_age,
                interestRate: data.interest_rate,
                minTermMonths: data.min_term_months,
                maxTermMonths: data.max_term_months,
                status: data.status,
            },
        });
    },

    update(id: number, data: UpdateProgramDto) {
        return prisma.program.update({
            where: { id },
            data: {
                ...(data.name !== undefined && { name: data.name }),
                ...(data.description !== undefined && { description: data.description }),
                ...(data.min_salary !== undefined && { minSalary: data.min_salary }),
                ...(data.max_dti !== undefined && { maxDti: data.max_dti }),
                ...(data.min_down_payment_percent !== undefined && { minDownPaymentPercent: data.min_down_payment_percent }),
                ...(data.max_vehicle_age !== undefined && { maxVehicleAge: data.max_vehicle_age }),
                ...(data.interest_rate !== undefined && { interestRate: data.interest_rate }),
                ...(data.min_term_months !== undefined && { minTermMonths: data.min_term_months }),
                ...(data.max_term_months !== undefined && { maxTermMonths: data.max_term_months }),
                ...(data.status !== undefined && { status: data.status }),
            },
        });
    },

    delete(id: number) {
        return prisma.program.delete({ where: { id } });
    },
};