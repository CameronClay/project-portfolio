import { NextRequest, NextResponse } from 'next/server';
import * as api_middleware from '@src/lib/api/test-middleware';
import { verify_user_cookie } from '@src/lib/auth';
import { log_ext } from '@src/lib/utils/log-utils';

//https://nextjs.org/docs/messages/node-module-in-edge-runtime
//Next.js Middleware runs on the server, using the edge runtime

import { PROD_URL_BASE } from '@src/constants/url-constants';
import { get_error_message } from './lib/utils/validation';

//restrict middleware api paths to the server itself
function restrict_middleware(request: NextRequest): NextResponse | null {
    const url = new URL(request.url);
    const middleware_path =
        url.protocol + '//' + PROD_URL_BASE + '/api/middleware';

    // await log_ext("url: " + url.toString());
    // await log_ext("middleware_path: " + middleware_path);
    // await log_ext("home_url: " + home_url);
    // await log_ext("host: " + request.headers.get('host'));
    // await log_ext("referer: " + request.headers.get('referer'));
    // await log_ext('----------------');

    const response: NextResponse | null = null;

    //should also protect middleware api path with authentication as the referer/host can be spoofed, but for the purpose of this project this is not needed
    if (request.url.startsWith(middleware_path)) {
        if (
            process.env.NEXT_PUBLIC_RUNNING_LOCAL ||
            request.headers
                .get('referer')
                ?.startsWith(process.env.HOST_PFX as string)
        ) {
            //TODO: protect middleware api path with authentication
        } else {
            return NextResponse.json(
                {
                    message: 'Forbidden',
                },
                { status: 403 }
            );
        }
    }

    return response;
}

//store ip of all users who visit the homepage in database
//returns null if should continue with the next middleware and a valid response promise otherwise
async function store_ip(request: NextRequest): Promise<NextResponse | null> {
    const url = new URL(request.url);
    const home_url = url.protocol + '//' + PROD_URL_BASE + '/';

    if (request.url == home_url) {
        let ip = request.ip ?? request.headers.get('x-real-ip'); //?? is the nullish coalescing operator (request.ip if it is not null, else request.headers.get('x-real-ip'))
        const forwardedFor = request.headers.get('x-forwarded-for');
        if (!ip && forwardedFor) {
            ip = forwardedFor.split(',').at(0) ?? 'Unknown';
        }
        if (!ip) {
            ip = 'Unknown';
        }

        try {
            // Cannot use Node.js modules in middleware so cannot use mongodb Node.js driver (bypass with api call)
            // await stats_db.create_stat(ip, Date.now());
            const response = await api_middleware.create_stat(Date.now(), ip);
            if (response.status != 200) {
                await log_ext('create_stat failed, status=' + response.status);
            }
        } catch (error: unknown) {
            await log_ext(get_error_message(error));
        }

        return null;
    }

    return null;
}

//restricted protected apis to logged in users (those with valid JWT token)
//returns null if should continue with the next middleware and a valid response promise otherwise
async function verify_identity(
    request: NextRequest
): Promise<NextResponse | null> {
    const url = new URL(request.url);
    const protected_path = url.protocol + '//' + PROD_URL_BASE + '/api/private';

    let response: NextResponse | null = null;

    if (request.url.startsWith(protected_path)) {
        try {
            const user_info = await verify_user_cookie(request);

            response = NextResponse.next();

            //store user info in request so it can be accessed by api route (runs on server)
            response.headers.set('User_Info', JSON.stringify(user_info));
            // request.cookies.set(get_jwt_info_key(), JSON.stringify(user_info));
        } catch (err: unknown) {
            response = NextResponse.json(
                {
                    message: 'Unauthorized',
                    auth_msg: (err as Error).toString(), //set auth_msg only if jwt token is invalid or not present
                },
                { status: 401 }
            );
        }
    }

    return response;
}

//middleware runs before every request
export async function middleware(request: NextRequest) {
    // console.log(request.headers.get('referer'));
    // log_ext('middleware: ' + request.url);

    let response = restrict_middleware(request);
    if (response != null) {
        return response;
    }

    response = await verify_identity(request);
    if (response != null) {
        return response;
    }

    response = await store_ip(request);
    if (response != null) {
        return response;
    }

    return NextResponse.next();
}
