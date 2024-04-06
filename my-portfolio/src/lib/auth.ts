import { NextRequest, NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import { SignJWT, jwtVerify, JWTVerifyOptions } from 'jose'; //used for jwt
import { get_jwt_secret_key, get_jwt_algorithm, get_jwt_exp_minutes, get_user_token_key } from '@src/constants/auth-constants';

interface UserJwtPayload {
    jti : string, //jwt id
    iat : number, //issued at
    issuer : string,
    user_id : string,
    username : string,
    is_admin : boolean
}

export class AuthError extends Error {}

//https://blog.logrocket.com/jwt-authentication-best-practices/
//JWT can either be sent in authorization header or as a cookie
//Cookies sent back to the client in a response are automatically sent back to the server in subsequent requests from the client while the cookie is valid

//Verifies the user's JWT token and returns its UserJwtPayload if it is valid.
export async function verify_user_cookie(req: NextRequest) {
    const token = req.cookies.get(get_user_token_key())?.value;

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
                ignoreExpiration: false
            } as JWTVerifyOptions
        );
        return result.payload as unknown as UserJwtPayload;
    } catch (err) {
        throw new AuthError('Invalid session/JWT token');
    }
    req.cookies.set
}

export async function get_jwt_token(user_id: string, username: string, is_admin: boolean = false) {
    const token = await new SignJWT({
        user_id: user_id,
        username: username,
        is_admin: is_admin
    })
        .setProtectedHeader({ alg: get_jwt_algorithm() })
        .setJti(nanoid())
        .setIssuer('my-portfolio')
        .setIssuedAt()
        .setExpirationTime(get_jwt_exp_minutes() + ' m')
        .sign(new TextEncoder().encode(get_jwt_secret_key()));

    return token;
}

//Adds the user jwt token cookie to the response
export async function set_user_cookie(res: NextResponse, jwt_token : string) {
    res.cookies.set(get_user_token_key(), jwt_token, {
        httpOnly: true,
        maxAge: 60 * get_jwt_exp_minutes(), // in seconds
    });

    return res;
}

//expires the user jwt token cookie
export function expire_user_cookie(res: NextResponse) {
    res.cookies.set(get_user_token_key(), '', { httpOnly: true, maxAge: 0 });
    return res;
}


//returns response if user doesn't have necessary permissions
export function validate_user_info(req: NextRequest, admin_req: boolean = false) {
    const user_info = req.headers.get('User_Info');
    if(user_info == null) {
        return {
            jwt_info: null,
            response: NextResponse.json({ message: "User info not found" }, { status: 401 })
        };
    }
    const jwt_info = JSON.parse(user_info) as any as UserJwtPayload;

    if(!jwt_info.is_admin && admin_req) {
        return {
            jwt_info: jwt_info,
            response: NextResponse.json({ message: "Admin permissions required" }, { status: 401 })
        };
    }

    return {
        jwt_info: jwt_info,
        response: null
    };
}
