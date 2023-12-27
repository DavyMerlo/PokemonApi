import ErrorResponse from "../components/Error";


export function handleErrorResponse(
    statusCode: number,
    error: string,
    errorMessage: string
): { status: number; data: ErrorResponse } {
    const errorResponse: ErrorResponse = {
        error,
        error_message: errorMessage,
    };
    return { status: statusCode, data: errorResponse };
}