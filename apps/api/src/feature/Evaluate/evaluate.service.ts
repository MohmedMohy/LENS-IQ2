import { evaluateEngine } from "@lens/engine";
import type { EvaluateResponse } from "@lens/shared-types";
import { prisma } from "../../db/prisma.js";
import { mapProgramToDto } from "../Programs/programs.mapper.js";
import { mapRuleToDto } from "../Rules/rules.mapper.js";
import { mapApplicationToEngineInput } from "../Applications/applications.mapper.js";

function notFound(entity: string, id: number): never {
    throw Object.assign(new Error(`${entity} ${id} not found`), { statusCode: 404 });
}

export const evaluateService = {
    async evaluateApplication(applicationId: number): Promise<EvaluateResponse> {
        const application = await prisma.application.findUnique({
            where: { id: applicationId },
        });

        if (!application) notFound("Application", applicationId);

        const programsWithRules = await prisma.program.findMany({
            where: { status: "ACTIVE" },
            include: { rules: { where: { active: true } } },
        });

        const programs = programsWithRules.map(mapProgramToDto);

        const rules = programsWithRules.flatMap(p =>
            p.rules.map(mapRuleToDto)
        );

        return evaluateEngine({
            application: mapApplicationToEngineInput(application),
            programs,
            rules,
        });
    },
};