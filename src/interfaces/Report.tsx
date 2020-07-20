interface Report {
    date: Date;
    files: number;
    input: string;
    result: boolean;
    errors: number;
    passed: number;
    score: number;
    warnings?: number;
    infos?: number;
    filePath?: string;
}