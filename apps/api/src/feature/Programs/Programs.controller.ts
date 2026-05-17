import type { FastifyRequest, FastifyReply } from "fastify";
import { programsService } from "./Programs.services.js";
import {
    CreateProgramSchema,
    UpdateProgramSchema,
    ProgramIdParamSchema,
} from "./programs.schema.js";

export const programsController = {
    async list(req: FastifyRequest, reply: FastifyReply) {
        const bankId = (req.query as { bank_id?: string }).bank_id
            ? Number((req.query as { bank_id: string }).bank_id)
            : undefined;

        const programs = await programsService.list(bankId);
        return reply.send({ data: programs });
    },

    async getById(req: FastifyRequest, reply: FastifyReply) {
        const { id } = ProgramIdParamSchema.parse(req.params);
        const program = await programsService.getById(id);
        return reply.send({ data: program });
    },

    async create(req: FastifyRequest, reply: FastifyReply) {
        const dto = CreateProgramSchema.parse(req.body);
        const program = await programsService.create(dto);
        return reply.status(201).send({ data: program });
    },

    async update(req: FastifyRequest, reply: FastifyReply) {
        const { id } = ProgramIdParamSchema.parse(req.params);
        const dto = UpdateProgramSchema.parse(req.body);
        const program = await programsService.update(id, dto);
        return reply.send({ data: program });
    },

    async remove(req: FastifyRequest, reply: FastifyReply) {
        const { id } = ProgramIdParamSchema.parse(req.params);
        await programsService.remove(id);
        return reply.status(204).send();
    },
};