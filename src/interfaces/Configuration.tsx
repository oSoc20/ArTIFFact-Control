export type ValidOperator = '=' | '<' | '>' | '<=' | '>='

export interface Policy {
    name: string;
    operator: ValidOperator;
    value: string | number | any;
}

export type ReportTypes = 'HTML' | 'JSON' | 'PDF' | 'XML and METS'

export interface Configuration {
    name: string;
    implementation: string;
    policies?: Array<Policy>;
    reports?: Array<ReportTypes | string>;
}