// packages/engine/src/evaluate/evaluate.types.ts
import type { Rule } from "@lens/shared-types";

export type RuleExecutionResult = {
    rule: Rule;
    passed: boolean;
    message: string | null;
};

export type ScoredOffer = {
    programId: number;
    bankId: number;
    score: number;
    ruleResults: RuleExecutionResult[];
};