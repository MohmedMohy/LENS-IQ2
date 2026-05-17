// packages/engine/src/rules/execute-rules.ts
import type { Rule, Application, Program } from "@lens/shared-types";
import type { RuleExecutionResult } from "../evaluate/evaluate.types";
import { evaluateOperator } from "./operators";

const RESOLVABLE_FIELDS: Record<string, (app: Application, prog: Program) => number> = {
    salary: (app) => app.salary,
    current_liabilities: (app) => app.current_liabilities ?? 0,
    requested_down_payment: (app) => app.requested_down_payment,
    vehicle_price: (app) => app.price,
    manufacturing_year: (app) => app.manufacturing_year,
    min_down_payment_percent: (_, prog) => prog.min_down_payment_percent,
};

export function executeRules(
    rules: Rule[],
    application: Application,
    program: Program
): RuleExecutionResult[] {
    const activeRules = rules
        .filter(r => r.active !== false)
        .sort((a, b) => (a.priority ?? 0) - (b.priority ?? 0));

    return activeRules.map((rule) => {
        const resolver = RESOLVABLE_FIELDS[rule.field];

        if (!resolver) {
            return {
                rule,
                passed: false,
                message: `Unknown field: ${rule.field}`,
            };
        }

        const fieldValue = resolver(application, program);
        const ruleValue = Number(rule.value);
        const passed = evaluateOperator(fieldValue, rule.operator, ruleValue);

        return { rule, passed, message: passed ? null : rule.message };
    });
}