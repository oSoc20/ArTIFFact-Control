interface Report {
    fileName: string;
    filePath: string;
    date: Date;
    result?: boolean;
    errors?: number;
    passed?: number;
    warnings?: number;
    infos?: number;
    score?: number;
    formats?: Array<Format> | null;
}