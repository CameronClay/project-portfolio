import { NextRequest, NextResponse } from 'next/server';
import * as api_middleware from '@src/lib/api/middleware';
import { verify_user_cookie } from '@src/lib/auth';
import { log_ext } from '@src/lib/utils/log-utils';

//https://nextjs.org/docs/messages/node-module-in-edge-runtime
//Next.js Middleware runs on the server, using the edge runtime

import { PROD_URL_BASE } from '@src/constants/url-constants';
import { get_error_message } from '@src/lib/utils/validation';

export type MiddlewareResponse = {
    response: Response,
    should_proc_req: boolean //false if request should be blocked, true if request should be processed or move on to the next middleware (depending on stage)
}

//restrict middleware api paths to the server itself
function restrict_middleware(request: Request, response: Response): MiddlewareResponse {
    const url = new URL(request.url);
    const middleware_path =
        url.protocol + '//' + PROD_URL_BASE + '/api/middleware';

    // await log_ext("url: " + url.toString());
    // await log_ext("middleware_path: " + middleware_path);
    // await log_ext("home_url: " + home_url);
    // await log_ext("host: " + request.headers.get('host'));
    // await log_ext("referer: " + request.headers.get('referer'));
    // await log_ext('----------------');

    // const response: NextResponse | null = null;

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
            response = Response.json(
                {
                    message: 'Forbidden',
                },
                { status: 403 }
            );

            return { response: response, should_proc_req: false };
        }
    }

    return { response: response, should_proc_req: true };
}

//store ip of all users who visit the homepage in database
async function store_ip(request: Request, response: Response): Promise<MiddlewareResponse> {
    const url = new URL(request.url);
    const home_url = url.protocol + '//' + PROD_URL_BASE + '/';

    if (request.url == home_url) {
        // remoteAddress only available in NextRequest
        // let ip = request.remoteAddress ?? request.headers.get('x-real-ip'); //?? is the nullish coalescing operator (request.ip if it is not null, else request.headers.get('x-real-ip'))
        let ip = request.headers.get('x-real-ip');
        const forwardedFor = request.headers.get('x-forwarded-for');
        if (!ip && forwardedFor) {
            ip = forwardedFor.split(',').at(0) ?? 'Unknown';
        }
        if (!ip) {
            ip = 'Unknown';
        }

        try {
            // Cannot use Node.js modules in middleware so cannot use mongodb Node.js driver (bypass with api call)
            const resp = await api_middleware.create_stat(Date.now(), ip);
            if (resp.status != 200) {
                await log_ext('create_stat failed, status=' + resp.status);
            }
        } catch (error: unknown) {
            await log_ext(get_error_message(error));
        }
    }

    return { response: response, should_proc_req: true };
}

//restricted protected apis to logged in users (those with valid JWT token)
async function verify_identity(request: Request, response: Response): Promise<MiddlewareResponse> {
    const url = new URL(request.url);
    const protected_path = url.protocol + '//' + PROD_URL_BASE + '/api/private';

    if (request.url.startsWith(protected_path)) {
        try {
            const user_info = await verify_user_cookie(request);

            //store user info in request so it can be accessed by api route (runs on server)
            const user_info_str = JSON.stringify(user_info);
            // request.headers.set('User_Info', user_info_str); //needed for jest testing
            response.headers.set('User_Info', user_info_str); //needed for nextjs middleware
        } catch (err: unknown) {
            response = Response.json(
                {
                    message: 'Unauthorized',
                    auth_msg: (err as Error).toString(), //set auth_msg only if jwt token is invalid or not present
                },
                { status: 401 }
            );

            return { response: response, should_proc_req: false };
        }
    }

    return { response: response, should_proc_req: true };
}

async function middleware_def(request: Request, response: Response): Promise<MiddlewareResponse> {
    let middleware_resp = { response: response, should_proc_req: true } as MiddlewareResponse;

    middleware_resp = restrict_middleware(request, middleware_resp.response);
    if (!middleware_resp.should_proc_req) {
        return middleware_resp;
    }

    middleware_resp = await verify_identity(request, middleware_resp.response);
    if (!middleware_resp.should_proc_req) {
        return middleware_resp;
    }

    middleware_resp = await store_ip(request, middleware_resp.response);
    if (!middleware_resp.should_proc_req) {
        return middleware_resp;
    }

    return middleware_resp;
}

//returns true if the request should be processed, and false if it should be blocked
export async function middleware_def_test(request: Request): Promise<MiddlewareResponse> {
    let middleware_resp = { response: Response.json({}), should_proc_req: true } as MiddlewareResponse;
    // console.log('Running middleware!!!! ' + request.url);

    middleware_resp = await middleware_def(request, middleware_resp.response);
    copy_response_headers(request, middleware_resp.response);
    return middleware_resp;
}

//copies response headers to the request headers
function copy_response_headers(request: Request, response: Response) {
    // console.log('[copy_response_headers] ' + JSON.stringify(response.headers));
    for (const [key, value] of response.headers) {
        // console.log(`[copy_response_headers] ${key}: ${value}`);
        request.headers.set(key, value);
    }

    // console.log(`[copy_response_headers] cookie: ${response.headers.get('cookie')}`);
}

//middleware runs before every request
export async function middleware(request: Request) {
    let middleware_resp = { response: NextResponse.next(), should_proc_req: true } as MiddlewareResponse;
    // console.log('Running middleware!!!! ' + request.url);

    middleware_resp = await middleware_def(request, middleware_resp.response);
    if (!middleware_resp.should_proc_req) {
        return middleware_resp.response;
    }

    return middleware_resp.response;
}
