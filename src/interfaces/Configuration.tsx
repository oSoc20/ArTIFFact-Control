export type ValidOperator = '=' | '<' | '>' | '<=' | '>='

export interface Policy {
    name: string;
    type: ValidOperator;
    value: string | number | any;
}

export type ReportTypes = 'HTML' | 'JSON' | 'PDF' | 'XML and METS'

export interface Configuration {
    name: string;
    profiles: Array<string>;
    policies: Array<Policy>;
    reports: Array<ReportTypes | string>;
}