import { prisma } from "../../db/prisma.js";
import type { CreateApplicationDto } from "./applications.schema.js";

export const applicationsRepository = {
    findAll() {
        return prisma.application.findMany({ orderBy: { createdAt: "desc" } });
    },

    findById(id: number) {
        return prisma.application.findUnique({ where: { id } });
    },

    create(data: CreateApplicationDto) {
        return prisma.application.create({
            data: {
                customerId: data.customer_id,
                vehicleId: data.vehicle_id,
                salary: data.salary,
                jobType: data.job_type,
                age: data.age,
                currentLiabilities: data.current_liabilities,
                brand: data.brand,
                model: data.model,
                manufacturingYear: data.manufacturing_year,
                condition: data.condition,
                price: data.price,
                requestedDownPayment: data.requested_down_payment,
            },
        });
    },

    updateStatus(id: number, status: string) {
        return prisma.application.update({ where: { id }, data: { status: status as never } });
    },
};