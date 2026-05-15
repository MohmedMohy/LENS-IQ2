import type {
    Application,
    Program,
    Rule,
    EvaluateResponse
} from "@lens/shared-types/";

type EvaluateEngineInput = {
    application: Application;

    programs: Program[];

    rules: Rule[];
};

export function evaluateEngine(
    input: EvaluateEngineInput
): EvaluateResponse {

    return {
        bestOffer: null,
        offers: []
    };
}