interface Report {
    name: string;
    directory: string;
    path: string;
    date: Date;
    files: number;
    result: boolean;
    errors: number;
    passed: number;
    warnings: number;
    score: number;
    duration: number;
    formats: Array<Format>;
    infos?: number;
    filePath?: string;
}