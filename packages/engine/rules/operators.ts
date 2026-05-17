// packages/engine/src/rules/operators.ts
import type { RuleOperator } from "@lens/shared-types";

export function evaluateOperator(
    fieldValue: number,
    operator: RuleOperator,
    ruleValue: number
): boolean {
    switch (operator) {
        case ">": return fieldValue > ruleValue;
        case "<": return fieldValue < ruleValue;
        case ">=": return fieldValue >= ruleValue;
        case "<=": return fieldValue <= ruleValue;
        case "=": return fieldValue === ruleValue;
        case "!=": return fieldValue !== ruleValue;
    }
}