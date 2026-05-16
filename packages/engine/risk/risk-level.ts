export type RiskLevel =
    | "LOW"
    | "MEDIUM"
    | "HIGH";

export function getRiskLevel(
    score: number
): RiskLevel {

    if (score >= 80) {
        return "LOW";
    }

    if (score >= 50) {
        return "MEDIUM";
    }

    return "HIGH";
}