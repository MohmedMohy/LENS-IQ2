import type { FastifyInstance } from "fastify";
import { applicationsController } from "./applications.controller.js";

export async function applicationsRoutes(app: FastifyInstance) {
    app.get("/", applicationsController.list);
    app.get("/:id", applicationsController.getById);
    app.post("/", applicationsController.create);
    app.patch("/:id/status", applicationsController.updateStatus);
}