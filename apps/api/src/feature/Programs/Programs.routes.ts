import type { FastifyInstance } from "fastify";
import { programsController } from "./Programs.controller.js"
export async function programsRoutes(app: FastifyInstance) {
    app.get("/", programsController.list);
    app.get("/:id", programsController.getById);
    app.post("/", programsController.create);
    app.patch("/:id", programsController.update);
    app.delete("/:id", programsController.remove);
}