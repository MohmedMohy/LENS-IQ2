import type { Application } from "@lens/shared-types";
import { applicationsRepository } from "./applications.repository.js";
import { mapApplicationToDto } from "./applications.mapper.js";
import type { CreateApplicationDto, UpdateApplicationStatusDto } from "./applications.schema.js";

function notFound(id: number): never {
    throw Object.assign(new Error(`Application ${id} not found`), { statusCode: 404 });
}

export const applicationsService = {
    async list(): Promise<Application[]> {
        const rows = await applicationsRepository.findAll();
        return rows.map(mapApplicationToDto);
    },

    async getById(id: number): Promise<Application> {
        const row = await applicationsRepository.findById(id);
        if (!row) notFound(id);
        return mapApplicationToDto(row);
    },

    async create(dto: CreateApplicationDto): Promise<Application> {
        const row = await applicationsRepository.create(dto);
        return mapApplicationToDto(row);
    },

    async updateStatus(id: number, dto: UpdateApplicationStatusDto): Promise<Application> {
        const exists = await applicationsRepository.findById(id);
        if (!exists) notFound(id);
        const row = await applicationsRepository.updateStatus(id, dto.status);
        return mapApplicationToDto(row);
    },
};