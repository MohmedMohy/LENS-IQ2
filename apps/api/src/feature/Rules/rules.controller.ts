import type { FastifyRequest, FastifyReply } from "fastify";
import { rulesService } from "./rules.service.js";
import { CreateRuleSchema, UpdateRuleSchema, RuleIdParamSchema } from "./rules.schema.js";
import { z } from "zod";

const ProgramIdQuerySchema = z.object({
    program_id: z.coerce.number().int().positive(),
});

export const rulesController = {
    async listByProgram(req: FastifyRequest, reply: FastifyReply) {
        const { program_id } = ProgramIdQuerySchema.parse(req.query);
        const rules = await rulesService.listByProgram(program_id);
        return reply.send({ data: rules });
    },

    async getById(req: FastifyRequest, reply: FastifyReply) {
        const { id } = RuleIdParamSchema.parse(req.params);
        const rule = await rulesService.getById(id);
        return reply.send({ data: rule });
    },

    async create(req: FastifyRequest, reply: FastifyReply) {
        const dto = CreateRuleSchema.parse(req.body);
        const rule = await rulesService.create(dto);
        return reply.status(201).send({ data: rule });
    },

    async update(req: FastifyRequest, reply: FastifyReply) {
        const { id } = RuleIdParamSchema.parse(req.params);
        const dto = UpdateRuleSchema.parse(req.body);
        const rule = await rulesService.update(id, dto);
        return reply.send({ data: rule });
    },

    async remove(req: FastifyRequest, reply: FastifyReply) {
        const { id } = RuleIdParamSchema.parse(req.params);
        await rulesService.remove(id);
        return reply.status(204).send();
    },
};
