export type RuleOperator =
    | ">"
    | "<"
    | ">="
    | "<="
    | "="
    | "!=";

export type RuleAction =
    | "REJECT"
    | "CONDITIONAL"
    | "WARNING";

export type Rule = {
    id: number;

    program_id: number;

    field: string;

    operator: RuleOperator;

    value: string | number;

    action: RuleAction;

    message: string;

    priority?: number;

    active?: boolean;

    created_at?: string;

    updated_at?: string;
};