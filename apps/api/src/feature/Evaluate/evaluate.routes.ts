import type { FastifyInstance } from "fastify";
import { evaluateController } from "./evaluate.controller.js";

export async function evaluateRoutes(app: FastifyInstance) {
    app.post("/", evaluateController.evaluate);
}