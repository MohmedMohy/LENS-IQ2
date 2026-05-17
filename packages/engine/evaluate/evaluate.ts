// packages/engine/src/evaluate/evaluate.ts
import type {
    Application, Program, Rule, EvaluateResponse, Offer, Reason
} from "@lens/shared-types";
import { calculateInstallment } from "../affordability/calculate-installment";
import { calculateDTI } from "../affordability/calculate-dti";
import { calculateAffordabilityScore } from "../affordability/affordability-score";
import { calculateRiskScore } from "../risk/risk-score";
import { getRiskLevel } from "../risk/risk-level";
import { executeRules } from "../rules/execute-rules";
import { rankOffers } from "../scoring/rank-offers";

type EvaluateEngineInput = {
    application: Application;
    programs: Program[];
    rules: Rule[];
};

export function evaluateEngine(input: EvaluateEngineInput): EvaluateResponse {
    const { application, programs, rules } = input;

    const offers: Offer[] = [];

    for (const program of programs) {
        if (program.status !== "ACTIVE") continue;

        const programRules = rules.filter(r => r.program_id === program.id);

        const termOptions = generateTermOptions(program);

        for (const months of termOptions) {
            const financeAmount = application.price - application.requested_down_payment;

            const installment = calculateInstallment({
                financeAmount,
                annualInterestRate: program.interest_rate,
                months,
            });

            const dti = calculateDTI(
                application.salary,
                application.current_liabilities ?? 0,
                installment
            );

            const ruleResults = executeRules(programRules, application, program);
            const rejectedRules = ruleResults.filter(r => !r.passed);

            const reasons: Reason[] = rejectedRules.map(r => ({
                type: "RULE",
                message: r.message ?? r.rule.message,
                impact: r.rule.action === "REJECT" ? "HIGH" : "MEDIUM",
            }));

            const hasHardReject = rejectedRules.some(r => r.rule.action === "REJECT");

            const status = hasHardReject
                ? "REJECTED"
                : rejectedRules.length > 0
                    ? "CONDITIONAL"
                    : "APPROVED";

            const riskScore = calculateRiskScore(application);
            const riskLevel = getRiskLevel(riskScore);
            const affordabilityScore = calculateAffordabilityScore(dti);

            offers.push({
                programId: program.id,
                bankId: program.bank_id,
                status,
                installment,
                totalPayment: installment * months,
                financeAmount,
                downPayment: application.requested_down_payment,
                interestRate: program.interest_rate,
                months,
                dti,
                riskScore,
                riskLevel,
                affordabilityScore,
                reasons,
            });
        }
    }

    const approvedOffers = offers.filter(o => o.status !== "REJECTED");
    const ranked = rankOffers(approvedOffers);

    return {
        bestOffer: ranked[0] ?? null,
        offers: ranked,
    };
}

function generateTermOptions(program: Program): number[] {
    const options: number[] = [];
    for (let m = program.min_term_months; m <= program.max_term_months; m += 12) {
        options.push(m);
    }
    return options;
}