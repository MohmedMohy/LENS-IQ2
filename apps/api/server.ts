import { buildApp } from "./app.js";

const PORT = Number(process.env.PORT ?? 4000);
const HOST = process.env.HOST ?? "0.0.0.0";

const app = buildApp();

try {
    await app.listen({ port: PORT, host: HOST });
    console.log(`API running at http://${HOST}:${PORT}`);
} catch (err) {
    app.log.error(err);
    process.exit(1);
}