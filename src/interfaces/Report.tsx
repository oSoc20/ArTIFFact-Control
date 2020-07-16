interface Report {
    name: string;
    date: Date;
    files: number;
    input: string;
    result: boolean;
    errors: number;
    passed: number;
    score: number;
}