import type { Program } from "@lens/shared-types";
import { programsRepository } from "./Programs.repository.js";
import { mapProgramToDto } from "./programs.mapper.js";
import type { CreateProgramDto, UpdateProgramDto } from "./programs.schema.js";

function notFound(id: number): never {
    const err = new Error(`Program ${id} not found`);
    (err as NodeJS.ErrnoException & { statusCode: number }).statusCode = 404;
    throw err;
}

export const programsService = {
    async list(bankId?: number): Promise<Program[]> {
        const rows = await programsRepository.findAll(bankId);
        return rows.map(mapProgramToDto);
    },

    async getById(id: number): Promise<Program> {
        const row = await programsRepository.findById(id);
        if (!row) notFound(id);
        return mapProgramToDto(row);
    },

    async create(dto: CreateProgramDto): Promise<Program> {
        const row = await programsRepository.create(dto);
        return mapProgramToDto(row);
    },

    async update(id: number, dto: UpdateProgramDto): Promise<Program> {
        const exists = await programsRepository.findById(id);
        if (!exists) notFound(id);
        const row = await programsRepository.update(id, dto);
        return mapProgramToDto(row);
    },

    async remove(id: number): Promise<void> {
        const exists = await programsRepository.findById(id);
        if (!exists) notFound(id);
        await programsRepository.delete(id);
    },
};
