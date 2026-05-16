export function calculateDTI(
    salary: number,
    liabilities: number,
    installment: number
): number {

    if (salary <= 0) {
        return 0;
    }

    return (
        (liabilities + installment) / salary
    ) * 100;
}