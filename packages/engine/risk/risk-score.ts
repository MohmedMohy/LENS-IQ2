import type {
    Application
} from "@lens/shared-types";

export function calculateRiskScore(
    application: Application
): number {

    let score = 0;

    // salary stability
    if (application.salary >= 40000) {
        score += 30;
    } else if (application.salary >= 20000) {
        score += 20;
    } else {
        score += 10;
    }

    // liabilities impact
    if (
        (application.current_liabilities ?? 0)
        < application.salary * 0.3
    ) {
        score += 25;
    } else {
        score += 10;
    }

    // employment
    if (
        application.job_type === "SALARIED"
    ) {
        score += 25;
    } else {
        score += 15;
    }

    // age
    if (
        (application.age ?? 0) >= 25 &&
        (application.age ?? 0) <= 50
    ) {
        score += 20;
    }

    return score;
}