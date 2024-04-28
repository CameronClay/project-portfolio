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
    user_id: string;
    username: string;
    is_admin: boolean;
}

import { get_cookies } from '@src/lib/utils/cookie-utils';
import { get_error_message } from '@src/lib/utils/validation';

export class AuthError extends Error { }

//https://blog.logrocket.com/jwt-authentication-best-practices/
//JWT can either be sent in authorization header or as a cookie
//Cookies sent back to the client in a response are automatically sent back to the server in subsequent requests from the client while the cookie is valid

//Verifies the user's JWT token and returns its UserJwtPayload if it is valid.
export async function verify_jwt(token: string | undefined) {
    if (!token) {
        throw new AuthError('Requires logged in user (JWT token required)');
    }

    try {
        const result = await jwtVerify(
            token,
            new TextEncoder().encode(get_jwt_secret_key()),
            {
                issuer: 'my-portfolio',
                algorithms: [get_jwt_algorithm()],
                maxTokenAge: get_jwt_exp_minutes() + ' m',
                ignoreExpiration: false,
            } as JWTVerifyOptions
        );
        return result.payload as unknown as UserJwtPayload;
    } catch (err) {
        throw new AuthError('Invalid session/JWT token. ' + get_error_message(err));
    }
}

//Used for client to server api calls
export async function verify_user_cookie(req: Request) {
    const cookies = get_cookies(req);

    if (cookies) {
        if (get_user_token_key() in cookies) {
            return await verify_jwt(cookies[get_user_token_key()]);
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

    // // let a: Uint8Array;
    // // let b : Uint8ArrayConstructor;
    // console.log(Uint8Array);
    // // const sig = (new TextEncoder().encode(get_jwt_secret_key())) as Uint8Array;
    // const sig = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);
    // // const sig = 'blahasfdsa';
    // console.log(sig);
    // console.log(typeof sig);

    const token = await new SignJWT({
        user_id: user_id,
        username: username,
        is_admin: is_admin,
    })
        .setProtectedHeader({ alg: get_jwt_algorithm() })
        .setJti(nanoid())
        .setIssuer('my-portfolio')
        .setIssuedAt()
        .setExpirationTime(get_jwt_exp_minutes() + ' m')
        .sign(new TextEncoder().encode(get_jwt_secret_key()));

    // const token = await new SignJWT()
    //     .setProtectedHeader({ alg: get_jwt_algorithm() })
    //     .setJti(nanoid())
    //     .setIssuer('my-portfolio')
    //     .setIssuedAt()
    //     .setExpirationTime(get_jwt_exp_minutes() + ' m')
    //     .sign(sig); //causes TypeError: payload must be an instance of Uint8Array in jest

    // const token = 'balh';

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
    let cookie = `${get_user_token_key()}=${jwt_token}; Path=${path}; SameSite=strict; HttpOnly; Max-Age=${Math.floor(60 * get_jwt_exp_minutes())}`;
    if (process.env.NEXT_PUBLIC_RUNNING_LOCAL == 'true') {
        cookie += '; Secure';
    }
    res.headers.set('Set-Cookie', cookie);

    return res;
}

//Expires the user jwt token cookie (note the JWT token is still valid, this only expires the cookie)
//path is the path the cookie will be sent on follow up requests from the client e.g. /api/private
export function expire_user_cookie(res: Response, path: string = '/') {
    const cookie = `${get_user_token_key()}=; Path=${path}; Max-Age=0`;
    res.headers.set('Set-Cookie', cookie);
}

//Returns error response if user doesn't have necessary permissions or if user is not logged in. Otherwise, it returns the jwt_info set in the request.
export function validate_user_info(req: Request, admin_req: boolean = false) {
    const user_info = req.headers.get('User_Info');
    if (user_info == null) {
        return {
            jwt_info: null,
            response: Response.json(
                { message: 'User info not found' },
                { status: 401 }
            ),
        };
    }
    const jwt_info = JSON.parse(user_info) as UserJwtPayload;

    if (!jwt_info.is_admin && admin_req) {
        return {
            jwt_info: jwt_info,
            response: Response.json(
                { message: 'Admin permissions required' },
                { status: 401 }
            ),
        };
    }

    return {
        jwt_info: jwt_info,
        response: null,
    };
}

//Expires the user jwt token cookie (note the JWT token is still valid, this only expires the cookie)
// export function expire_user_cookie(res: NextResponse) {
//     res.cookies.set(get_user_token_key(), '', { httpOnly: true, maxAge: 0, path: '/api/private' });
//     return res;
// }

//Adds the user jwt token cookie to the response
// export function set_user_cookie(res: NextResponse, jwt_token: string) {
//     res.cookies.set(get_user_token_key(), jwt_token, {
//         path: '/api/private',
//         httpOnly: true, //prevent javascript access to the cookie
//         secure: process.env.NEXT_PUBLIC_RUNNING_LOCAL == 'true' ? false : true, //only send cookie over https except when running locally
//         sameSite: 'strict', //only send cookie on same site as request came from
//         maxAge: 60 * get_jwt_exp_minutes(), //expiration time in seconds
//     });
//
//     return res;
// }

//Used for client to server api calls
// export async function verify_user_cookie(req: NextRequest) {
//     const token = req.cookies.get(get_user_token_key())?.value;
//     return await verify_jwt(req, token);
// }
