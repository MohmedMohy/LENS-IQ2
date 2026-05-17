import type { FastifyInstance } from "fastify";
import { rulesController } from "./rules.controller.js";

export async function rulesRoutes(app: FastifyInstance) {
    app.get("/", rulesController.listByProgram);
    app.get("/:id", rulesController.getById);
    app.post("/", rulesController.create);
    app.patch("/:id", rulesController.update);
    app.delete("/:id", rulesController.remove);
}