import type { FastifyRequest, FastifyReply } from "fastify";
import { applicationsService } from "./applications.service.js";
import {
    CreateApplicationSchema,
    UpdateApplicationStatusSchema,
    ApplicationIdParamSchema,
} from "./applications.schema.js";

export const applicationsController = {
    async list(req: FastifyRequest, reply: FastifyReply) {
        const apps = await applicationsService.list();
        return reply.send({ data: apps });
    },

    async getById(req: FastifyRequest, reply: FastifyReply) {
        const { id } = ApplicationIdParamSchema.parse(req.params);
        const app = await applicationsService.getById(id);
        return reply.send({ data: app });
    },

    async create(req: FastifyRequest, reply: FastifyReply) {
        const dto = CreateApplicationSchema.parse(req.body);
        const app = await applicationsService.create(dto);
        return reply.status(201).send({ data: app });
    },

    async updateStatus(req: FastifyRequest, reply: FastifyReply) {
        const { id } = ApplicationIdParamSchema.parse(req.params);
        const dto = UpdateApplicationStatusSchema.parse(req.body);
        const app = await applicationsService.updateStatus(id, dto);
        return reply.send({ data: app });
    },
};