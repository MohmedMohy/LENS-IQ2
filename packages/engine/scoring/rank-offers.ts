// packages/engine/src/scoring/rank-offers.ts
import type { Offer } from "@lens/shared-types";
import { scoreOffer } from "./score-offer";

export function rankOffers(offers: Offer[]): Offer[] {
    return [...offers].sort(
        (a, b) => scoreOffer(b) - scoreOffer(a)
    );
}