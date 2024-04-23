//returns true if input is not null and is a string and the length is less than or equal to maxLength
export const validate_input = (input: unknown, maxLength: number): boolean => {
    if (!input) {
        return false;
    }

    return typeof input === 'string' && input.length <= maxLength;
};

//get error message from unknown error
export const get_error_message = (error: unknown): string => {
    let message: string = 'Unknown Error';
    if (error) {
        if (
            (typeof error === 'object' && 'message' in error) ||
            error instanceof Error
        ) {
            message = String(error.message);
        } else if (typeof error === 'string') {
            message = error;
        }
    }

    return message;
};
