import type { Offer } from "./offer";

export type EvaluateRequest = {
    application_id: number;
};

export type EvaluateResponse = {
    bestOffer: Offer | null;

    offers: Offer[];

    error?: string;
};