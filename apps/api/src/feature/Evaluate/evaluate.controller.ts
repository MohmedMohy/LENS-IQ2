import type { FastifyRequest, FastifyReply } from "fastify";
import { evaluateService } from "./evaluate.service.js";
import { z } from "zod";

const EvaluateBodySchema = z.object({
    application_id: z.number().int().positive(),
});

export const evaluateController = {
    async evaluate(req: FastifyRequest, reply: FastifyReply) {
        const { application_id } = EvaluateBodySchema.parse(req.body);
        const result = await evaluateService.evaluateApplication(application_id);
        return reply.send({ data: result });
    },
};