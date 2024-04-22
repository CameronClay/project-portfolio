const JWT_SECRET_KEY: string | undefined = process.env.JWT_SECRET_KEY;
const JWT_ALGORITHM: string | undefined = process.env.JWT_ALGORITHM;
const JWT_EXP_MINUTES: string | undefined = process.env.JWT_EXP_MINUTES;
const COOKIE_USER_TOKEN: string | undefined = process.env.COOKIE_USER_TOKEN; //cookie key for user token

export function get_jwt_secret_key(): string {
    if (!JWT_SECRET_KEY || JWT_SECRET_KEY.length === 0) {
        throw new Error('Environment variable JWT_SECRET_KEY not set.');
    }

    return JWT_SECRET_KEY;
}

export function get_jwt_algorithm(): string {
    if (!JWT_ALGORITHM || JWT_ALGORITHM.length === 0) {
        throw new Error('Environment variable JWT_ALGORITHM not set.');
    }

    return JWT_ALGORITHM;
}

export function get_jwt_exp_minutes(): number {
    if (!JWT_EXP_MINUTES || JWT_EXP_MINUTES.length === 0) {
        throw new Error('Environment variable JWT_EXP_MINUTES not set.');
    }

    return +JWT_EXP_MINUTES;
}

export function get_user_token_key(): string {
    if (!COOKIE_USER_TOKEN || COOKIE_USER_TOKEN.length === 0) {
        throw new Error('Environment variable COOKIE_USER_TOKEN not set.');
    }

    return COOKIE_USER_TOKEN;
}