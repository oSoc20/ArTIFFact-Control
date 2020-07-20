interface Report {
    name: string;
    date: Date;
    files: number;
    input: string;
    result: boolean;
    errors?: number;
    passed?: number;
    warnings?: number;
    score?: number;
    duration?: number;
    formats?: Array<Format>;
}