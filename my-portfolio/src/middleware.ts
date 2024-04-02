import { NextRequest, NextResponse } from "next/server";
import * as stats_db from '@src/lib/database/c_stats';
import * as api_test from '@src/lib/api-test';
  
//https://github.com/z4nr34l/next-easy-middlewares
// const middlewares = {
//     // This will match /blog route only
//     '/'   : homeMiddleware,
//     '/api/:path*': apiMiddleware,
// };
// export const middleware = createMiddleware(middlewares);

//Cannot use Node.js modules in middleware
//https://nextjs.org/docs/messages/node-module-in-edge-runtime

//Next.js Middleware runs on the server, using the edge runtime

const LOCAL_URL_BASE = process.env.LOCAL_URL_BASE + ":" + process.env.PORT;


//returns null if should continue with the next middleware and a valid response promise otherwise
async function store_ip(request: NextRequest): Promise<NextResponse | null> {
    const url = new URL(request.url);

    console.log(request.url);
    const middleware_url = url.protocol + '//' + LOCAL_URL_BASE + '/api/middleware';
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

        await api_test.create_stat(Date.now(), ip);

        return null;

        // await stats_db.create_stat(ip, Date.now());
        // Date.now();
        // await stats_db.create_stat(ip, Date.now()) 
    }
    if(request.url.startsWith(middleware_url)) { //restrict middleware api to localhost
        if (!request.headers.get("referer")?.startsWith(home_url)) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }
    }

    return null;
}

//middleware runs before every request
export async function middleware(request: NextRequest) {
    // console.log('middleware: ' + request.url);
    
    let response  = await store_ip(request); 
    if(response != null) {
        return response;
    }

    //use ip here
    
    return NextResponse.next();
}