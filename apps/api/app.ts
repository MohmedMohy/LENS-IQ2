import Fastify from "fastify";
import cors from "@fastify/cors";
import { errorHandlerPlugin } from "./plugins/error-handler.js";
import { programsRoutes } from "./src/feature/Programs/Programs.routes.js";
import { rulesRoutes } from "./src/feature/Rules/rules.routes.js";
import { applicationsRoutes } from "../api/src/feature/Applications/applications.routes.js";
import { evaluateRoutes } from "../api/src/feature/Evaluate/evaluate.routes.js";

export function buildApp() {
    const app = Fastify({
        logger: {
            level: process.env.LOG_LEVEL ?? "info",
        },
    });

    // ── Plugins ───────────────────────────────────────────────────────────────
    app.register(cors, {
        origin: process.env.CORS_ORIGIN ?? "*",
    });

    app.register(errorHandlerPlugin);

    // ── Health ────────────────────────────────────────────────────────────────
    app.get("/health", async () => ({ status: "ok", timestamp: new Date().toISOString() }));

    // ── Features ──────────────────────────────────────────────────────────────
    app.register(programsRoutes, { prefix: "/api/programs" });
    app.register(rulesRoutes, { prefix: "/api/rules" });
    app.register(applicationsRoutes, { prefix: "/api/applications" });
    app.register(evaluateRoutes, { prefix: "/api/evaluate" });

    return app;
}