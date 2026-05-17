// packages/engine/src/scoring/score-offer.ts
import type { Offer } from "@lens/shared-types";

export function scoreOffer(offer: Offer): number {
    let score = 0;

    score += (100 - offer.dti) * 0.4;
    score += offer.affordabilityScore * 0.3;
    score += offer.riskScore * 0.2;
    score += (1 / offer.interestRate) * 100 * 0.1;

    return Math.max(0, Math.min(100, score));
}