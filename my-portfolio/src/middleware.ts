import { NextRequest, NextResponse } from "next/server";
import * as api_middleware from '@src/lib/api/test-middleware';
import { verify_user_cookie, set_user_cookie } from '@src/lib/auth';

//https://nextjs.org/docs/messages/node-module-in-edge-runtime
//Next.js Middleware runs on the server, using the edge runtime

import { LOCAL_URL_BASE } from '@src/constants/url-constants';

//store ip of all users who visit the homepage in database
//returns null if should continue with the next middleware and a valid response promise otherwise
async function store_ip(request: NextRequest): Promise<NextResponse | null> {
    const url = new URL(request.url);
    const middleware_path = url.protocol + '//' + LOCAL_URL_BASE + '/api/middleware';
    const home_url = url.protocol + '//' + LOCAL_URL_BASE + '/';

    if(request.url == home_url) {
        let ip = request.ip ?? request.headers.get('x-real-ip'); //?? is for nullish coalescing (request.ip if it is not null, else request.headers.get('x-real-ip'))
        const forwardedFor = request.headers.get('x-forwarded-for');
        if(!ip && forwardedFor) {
            ip = forwardedFor.split(',').at(0) ?? 'Unknown';
        }
        if(!ip) {
            ip = 'Unknown';
        }

        // console.log('stored ip: ' + ip);

        await api_middleware.create_stat(Date.now(), ip);

        return null;

        // Cannot use Node.js modules in middleware so cannot use mongodb Node.js driver (bypass with api call)
        // await stats_db.create_stat(ip, Date.now());
    }
    if(request.url.startsWith(middleware_path)) { //restrict middleware api to localhost
        if (!request.headers.get("referer")?.startsWith(home_url)) {
            return NextResponse.json({
                 message: 'Unauthorized' 
            }, { status: 401 });
        }
    }

    return null;
}

//restricted protected apis to logged in users (those with valid JWT token)
//returns null if should continue with the next middleware and a valid response promise otherwise
async function verify_identity(request: NextRequest): Promise<NextResponse | null> {
    const url = new URL(request.url);
    const protected_path = url.protocol + '//' + LOCAL_URL_BASE + '/api/private';

    let response : NextResponse | null = null;

    if(request.url.startsWith(protected_path)) {
        try {
            let user_info = await verify_user_cookie(request);

            response =  NextResponse.next();

            //store user info in request so it can be accessed by api route (runs on server)
            response.headers.set('User_Info', JSON.stringify(user_info));
            // (response as any)['user_info'] = user_info;
            // request.cookies.set(get_jwt_info_key(), JSON.stringify(user_info));
        }
        catch(err : unknown) {
            response = NextResponse.json({
                message: 'Unauthorized',
                auth_msg: (err as Error).toString() //set auth_msg only if jwt token is invalid or not present
            }, { status: 401 });
        }
    }

    return response;
}

//middleware runs before every request
export async function middleware(request: NextRequest) {
    // console.log('middleware: ' + request.url);
    
    let response = await verify_identity(request);
    if(response != null) {
        return response;
    }

    response = await store_ip(request); 
    if(response != null) {
        return response;
    }
    
    return NextResponse.next();
}