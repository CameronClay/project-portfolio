import { setupServer } from 'msw/node';
import { http } from 'msw';

import { LOCAL_URL } from '@src/constants/url-constants';

import { POST as api_create_stat } from '@src/app/api/middleware/stat/route';

import { GET as api_test_endpoint } from '@src/app/api/public/test-endpoint/route';
import { POST as api_login } from '@src/app/api/public/account/login/route';
import { POST as api_register } from '@src/app/api/public/account/register/route';

import { DELETE as api_account_delete } from '@src/app/api/private/account/delete/route';
import { PATCH as api_account_update } from '@src/app/api/private/account/update/route';
import { POST as api_account_logout } from '@src/app/api/private/account/logout/route';
import { GET as api_test_endpoint_priv } from '@src/app/api/private/test-endpoint-priv/route';
import * as api_admin_stats from '@src/app/api/private/admin/stats/route';
import * as api_admin_stat from '@src/app/api/private/admin/stat/route';
import * as api_admin_user from '@src/app/api/private/admin/user/route';
import * as api_admin_users from '@src/app/api/private/admin/users/route';

import { setup_db, drop_db } from '@src/lib/database/mongodb';
import * as middleware from '@src/middleware';


// global.Response = HttpResponse;

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
global.Response.json = jest.fn().mockImplementation((data: any, init?: ResponseInit | undefined) => {
    /* eslint-disable-next-line @typescript-eslint/no-unsafe-argument */
    return new Response(data, init);
    // return new Response(JSON.stringify(data), init);
});


jest.mock('@src/lib/utils/log-utils', () => {
    /* eslint-disable-next-line @typescript-eslint/no-unsafe-return */
    return {
        ...jest.requireActual('@src/lib/utils/log-utils'),

        /* eslint-disable-next-line @typescript-eslint/require-await */
        log_ext: async (message: string) => {
            console.log(message);
        },
    };
});

const log_intercepted = () => {
    console.log('intercepted');
};

type response_fn_t = () => Promise<Response>;

const run_response = async (request: Request, resp_fn: response_fn_t) => {
    // log_intercepted();

    const middleware_resp = await middleware.middleware_def_test(request);
    if (!middleware_resp.should_proc_req) {
        return middleware_resp.response;
    }

    console.log('[run_response] middleware_req' + JSON.stringify(request));
    console.log('[run_response] middleware_resp' + JSON.stringify(middleware_resp.response));

    return await resp_fn();
};

//api handlers
const server = setupServer(
    http.get(LOCAL_URL + '/api/public/test-endpoint', async ({ request }: { request: Request }) => {
        return await run_response(request, async () => await api_test_endpoint(request));
        // return await api_test_endpoint(request);
    }),

    http.post(LOCAL_URL + '/api/public/account/register', async ({ request }: { request: Request }) => {
        return await run_response(request, async () => await api_register(request));
        // return await api_register(request);
    }),
    http.post(LOCAL_URL + '/api/public/account/login', async ({ request }: { request: Request }) => {
        return await run_response(request, async () => await api_login(request));
        // return await api_login(request);
    }),

    http.post(LOCAL_URL + '/api/private/account/logout', async ({ request }: { request: Request }) => {
        return await run_response(request, async () => await api_account_logout(request));
        // return await api_account_logout(request);
    }),
    http.post(LOCAL_URL + '/api/private/account/delete', async ({ request }: { request: Request }) => {
        return await run_response(request, async () => await api_account_delete(request));
        // return await api_account_delete(request);
    }),
    http.patch(LOCAL_URL + '/api/private/account/update', async ({ request }: { request: Request }) => {
        return await run_response(request, async () => await api_account_update(request));
        // return await api_account_update(request);
    }),

    http.get(LOCAL_URL + '/api/private/admin/stats', async ({ request }: { request: Request }) => {
        return await run_response(request, async () => await api_admin_stats.GET(request));
        // return await api_admin_stats.GET(request);
    }),
    http.delete(LOCAL_URL + '/api/private/admin/stats', async ({ request }: { request: Request }) => {
        return await run_response(request, async () => await api_admin_stats.DELETE(request));
        // return await api_admin_stats.DELETE(request);
    }),
    http.get(LOCAL_URL + '/api/private/admin/stat', async ({ request }: { request: Request }) => {
        return await run_response(request, async () => await api_admin_stat.GET(request));
        // return await api_admin_stat.GET(request);
    }),

    http.get(LOCAL_URL + '/api/private/admin/user', async ({ request }: { request: Request }) => {
        return await run_response(request, async () => await api_admin_user.GET(request));
        // return await api_admin_user.GET(request);
    }),
    http.delete(LOCAL_URL + '/api/private/admin/user', async ({ request }: { request: Request }) => {
        return await run_response(request, async () => await api_admin_user.DELETE(request));
        // return await api_admin_user.DELETE(request);
    }),
    http.patch(LOCAL_URL + '/api/private/admin/user', async ({ request }: { request: Request }) => {
        return await run_response(request, async () => await api_admin_user.PATCH(request));
        // return await api_admin_user.PATCH(request);
    }),
    http.get(LOCAL_URL + '/api/private/admin/users', async ({ request }: { request: Request }) => {
        return await run_response(request, async () => await api_admin_users.GET(request));
        // return await api_admin_users.GET(request);
    }),

    http.get(LOCAL_URL + '/api/private/test-endpoint-priv', async ({ request }: { request: Request }) => {
        return await run_response(request, async () => await api_test_endpoint_priv(request));
        // return await api_test_endpoint_priv(request);
    }),

    http.post(LOCAL_URL + '/api/middleware/stat', async ({ request }: { request: Request }) => {
        return await run_response(request, async () => await api_create_stat(request));
        // return await api_create_stat(request);
    }),
);

//before any test in a suite runs
beforeAll(() => {
    console.log('[setupserver beforeAll]');
    server.listen({
        onUnhandledRequest: ({ method, url }) => {
            if (!url.startsWith(LOCAL_URL + "/api")) {
                throw new Error(`Unhandled ${method} request to ${url}`);
            }
        }
    });
}, 10000);

//after all tests in a suite run
afterAll(() => {
    console.log('[setupserver afterAll]');
    server.close()
}, 10000);

//after each test in a suite runs
afterEach(() => {
    console.log('[setupserver afterEach]');
    server.resetHandlers()
}, 10000);
