// import { NextRequest, NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import { SignJWT, jwtVerify, JWTVerifyOptions, JWTPayload } from 'jose'; //used for jwt
import {
    get_jwt_secret_key,
    get_jwt_algorithm,
    get_jwt_exp_minutes,
    get_user_token_key,
} from '@src/constants/auth-constants';

interface UserJwtPayload {
    jti: string; //jwt id
    iat: number; //issued at
    issuer: string; //who issued the token
    audience: string; //who is allowed to use the token
    user_id: string;
    username: string;
    is_admin: boolean;
}

import { expire_cookie_str, get_cookies } from '@src/lib/utils/cookie-utils';
import { get_error_message } from '@src/lib/utils/validation';
import { ValidateUserInfoResponse } from '@src/constants/api/generic';

export class AuthError extends Error { }

//https://blog.logrocket.com/jwt-authentication-best-practices/
//JWT can either be sent in authorization header or as a cookie
//Cookies sent back to the client in a response are automatically sent back to the server in subsequent requests from the client while the cookie is valid

//Verifies the user's JWT token and returns its UserJwtPayload if it is valid.
export async function verify_jwt(token: string | undefined) {
    if (!token) {
        throw new AuthError('Requires logged in user (JWT token required)');
    }

    // console.log('[verify_jwt] jwt: ' + token);

    try {
        const result = await jwtVerify(
            token,
            new TextEncoder().encode(get_jwt_secret_key()),
            {
                issuer: 'my-portfolio',
                audience: 'my-portfolio',
                algorithms: [get_jwt_algorithm()],
                maxTokenAge: get_jwt_exp_minutes() + ' m',
                ignoreExpiration: false,
            } as JWTVerifyOptions
        );
        return result.payload as unknown as UserJwtPayload;
    } catch (err) {
        throw new AuthError('Invalid session/JWT token. ' + get_error_message(err) + ', jwt: ' + token);
    }
}

//Used for client to server api calls
export async function verify_user_cookie(req: Request) {
    // console.log('[verify_user_cookie] cookies: ' + req.headers.get('cookie'));
    const cookies = get_cookies(req);

    if (cookies) {
        if (get_user_token_key() in cookies) {
            const jwt_cookie = cookies[get_user_token_key()];

            // console.log('[verify_user_cookie] cookie: ' + jwt_cookie);

            return await verify_jwt(jwt_cookie);
        }

        throw new Error('JWT cookie not present in request');
    } else {
        // console.log('No cookies found in the request');
        throw new Error('Cookie not present in request');
    }
}

//Used for server to server api calls
export async function verify_auth_header(req: Request) {
    const token = req.headers.get('Authorization')?.split(' ')[1];
    return await verify_jwt(token);
}

//Generates a JWT token given user information and permissions
export async function get_jwt_token(
    user_id: string,
    username: string,
    is_admin: boolean = false
) {

    const token = await new SignJWT({
        user_id: user_id,
        username: username,
        is_admin: is_admin,
    })
        .setProtectedHeader({ alg: get_jwt_algorithm() })
        .setJti(nanoid())
        .setIssuer('my-portfolio')
        .setAudience('my-portfolio')
        .setIssuedAt()
        .setExpirationTime(get_jwt_exp_minutes() + ' m')
        .sign(new TextEncoder().encode(get_jwt_secret_key()));

    // console.log('[get_jwt_token] jwt token: ' + token);

    return token;
}

//Used for server to server api calls
export function set_auth_header(req: Response, token: string) {
    return req.headers.set('Authorization', 'Bearer ' + token);
}

//Adds the user jwt token cookie to the response
//path is the path the cookie will be sent on follow up requests from the client e.g. /api/private
export function set_user_cookie(
    res: Response,
    jwt_token: string,
    path: string = '/'
) {
    let jwt_cookie = `${get_user_token_key()}=${jwt_token}; Path=${path}; SameSite=strict; Max-Age=${Math.floor(60 * get_jwt_exp_minutes())}`;

    //if running in a production environment set flags to make cookie secure
    if (process.env.NEXT_PUBLIC_RUNNING_LOCAL !== 'true') {
        jwt_cookie += '; HttpOnly'; //httpOnly cookies are not accessible from javascript
        jwt_cookie += '; Secure'; //secure cookies are only sent over https
    }
    // console.log('[set_user_cookie] cookie: ' + jwt_cookie);

    //this appears to set cookie multiple times in jest tests
    res.headers.set('Set-Cookie', jwt_cookie);

    return res;
}

//Expires the user jwt token cookie (note the JWT token is still valid, this only expires the cookie)
//path is the path the cookie will be sent on follow up requests from the client e.g. /api/private
export function expire_user_cookie(res: Response, path: string = '/') {
    const cookie = expire_cookie_str(get_user_token_key(), path);
    res.headers.set('Set-Cookie', cookie);
}

//Returns error response if user doesn't have necessary permissions or if user is not logged in. Otherwise, it returns the jwt_info set in the request.
export function validate_user_info(req: Request, admin_req: boolean = false) {
    const user_info = req.headers.get('User_Info');
    if (user_info == null) {
        return {
            jwt_info: null,
            response: Response.json(
                { message: 'User info not found' } as ValidateUserInfoResponse,
                { status: 401 }
            ),
        };
    }
    const jwt_info = JSON.parse(user_info) as UserJwtPayload;

    if (!jwt_info.is_admin && admin_req) {
        return {
            jwt_info: jwt_info,
            response: Response.json(
                { message: 'Insufficent permissions' } as ValidateUserInfoResponse,
                { status: 401 }
            ),
        };
    }

    return {
        jwt_info: jwt_info,
        response: null,
    };
}