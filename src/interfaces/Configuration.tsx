export interface Policy {
    lhs: string;
    operator: '=' | '<' | '>' | '<=' | '>=';
    rhs: string | number | any;
}

export type ReportTypes = 'JSON' | 'PDF' | 'XML' | 'METS'

export interface Configuration {
    name: string;
    implementation: string;
    policies?: Array<Policy>;
    reports?: Array<ReportTypes>;
}