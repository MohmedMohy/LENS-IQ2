export type InstallmentInput = {
    financeAmount: number;

    annualInterestRate: number;

    months: number;
};

export function calculateInstallment(
    input: InstallmentInput
): number {

    const {
        financeAmount,
        annualInterestRate,
        months
    } = input;

    if (
        financeAmount <= 0 ||
        months <= 0
    ) {
        return 0;
    }

    const monthlyRate =
        annualInterestRate / 12 / 100;

    if (monthlyRate === 0) {
        return financeAmount / months;
    }

    const installment =
        (
            financeAmount *
            monthlyRate *
            Math.pow(1 + monthlyRate, months)
        ) /
        (
            Math.pow(1 + monthlyRate, months) - 1
        );

    return Number(
        installment.toFixed(2)
    );
}