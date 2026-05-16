export function calculateAffordabilityScore(
    dti: number
): number {

    if (dti <= 20) return 100;

    if (dti <= 30) return 85;

    if (dti <= 40) return 70;

    if (dti <= 50) return 50;

    if (dti <= 60) return 30;

    return 10;
}