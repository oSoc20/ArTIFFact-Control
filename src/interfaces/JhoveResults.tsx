export interface JHOVE_Message {
    message: string;
    prefix: string;
    subMessage: string;
    jhoveMessage: {
        subMessage: string;
        message: string;
        id: string;
    }
    id: string;
    offset: number
}


export default interface JHOVE_ValidationResponse {
    checksums: Array<{ type: string; value: string }>;
    created: string | null;
    fileName: string;
    format: string | null;
    lastMod: string | null;
    message: string;
    messages: Array<JHOVE_Message>;
    mimeType: string | null;
    sigMatches: Array<any>;
    size: number;
    valid: number;
    wellFormed: number;
}