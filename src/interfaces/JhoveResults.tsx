/**
 * Part of the JHOVE_ValidationResponse
 */
export interface JhoveMessage {
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

/**
 * Response of the JHOVE-rest API upon calling the validate endpoint.
 */
export default interface JhoveValidationResponse {
    checksums: Array<{ type: string; value: string }>;
    created: string | null;
    fileName: string;
    format: string | null;
    lastMod: string | null;
    message: string;
    messages: Array<JhoveMessage>;
    mimeType: string | null;
    sigMatches: Array<any>;
    size: number;
    valid: number;
    wellFormed: number;
}