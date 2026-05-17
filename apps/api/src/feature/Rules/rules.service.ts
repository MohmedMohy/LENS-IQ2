import type { Rule } from "@lens/shared-types";
import { rulesRepository } from "./rules.repository.js";
import { mapRuleToDto } from "./rules.mapper.js";
import type { CreateRuleDto, UpdateRuleDto } from "./rules.schema.js";

function notFound(id: number): never {
    const err = Object.assign(new Error(`Rule ${id} not found`), { statusCode: 404 });
    throw err;
}

export const rulesService = {
    async listByProgram(programId: number): Promise<Rule[]> {
        const rows = await rulesRepository.findByProgram(programId);
        return rows.map(mapRuleToDto);
    },

    async getById(id: number): Promise<Rule> {
        const row = await rulesRepository.findById(id);
        if (!row) notFound(id);
        return mapRuleToDto(row);
    },

    async create(dto: CreateRuleDto): Promise<Rule> {
        const row = await rulesRepository.create(dto);
        return mapRuleToDto(row);
    },

    async update(id: number, dto: UpdateRuleDto): Promise<Rule> {
        const exists = await rulesRepository.findById(id);
        if (!exists) notFound(id);
        const row = await rulesRepository.update(id, dto);
        return mapRuleToDto(row);
    },

    async remove(id: number): Promise<void> {
        const exists = await rulesRepository.findById(id);
        if (!exists) notFound(id);
        await rulesRepository.delete(id);
    },
};