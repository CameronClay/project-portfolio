export const validate_input = (input: unknown, maxLength: number): boolean => {
    //value is not null and is a string and the length is less than or equal to maxLength
    if(!input) {
        return false;
    }

    return (typeof input === 'string' && input.length <= maxLength);
}

export const get_error_message = (error: unknown): string => {
    let message: string = 'Unknown Error';
    if(error) {
        if ((typeof error === 'object' && 'message' in error) || (error instanceof Error)) {
            message = String(error.message);
        }
        else if(typeof error === 'string') {
            message = error;
        }
    }

    return message;
}
