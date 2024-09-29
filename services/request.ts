export interface ApiResponse<T> {
    success: boolean;
    data: T | null; // Toujours `T` ou `null` en cas d'erreur
    message?: string;
    statusCode?: number;
}

export const handleRequest = async <T>(requestFn: () => Promise<T>): Promise<ApiResponse<T>> => {
    try {
        const data = await requestFn();
        return {
            success: true,
            data,  // La donnée est de type T
        };
    } catch (error: unknown) {
        // Retourne un objet avec `data: null` en cas d'erreur
        return handleError<T>(error);
    }
};

export const handleError = <T>(error: unknown): ApiResponse<T> => {
    if (isFetchError(error)) {
        return {
            success: false,
            data: null, // Les données sont nulles en cas d'erreur
            message: error.data?.message || 'app.error',
            statusCode: error.statusCode || 500,
        };
    }
    return {
        success: false,
        data: null, // Toujours null en cas d'erreur
        message: 'app.error',
        statusCode: 500,
    };
};

function isFetchError(error: unknown): error is FetchError {
    return typeof error === 'object' && error !== null && 'data' in error && 'statusCode' in error;
}

interface FetchError {
    data?: {
        message?: string;
    };
    statusCode?: number;
}
