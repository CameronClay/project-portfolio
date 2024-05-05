import { ValidateUserInfoResponse } from '@/src/constants/api/generic';
import { get_jwt_exp_minutes, get_user_token_key } from '@/src/constants/auth-constants';
import { get_jwt_token, verify_jwt, set_user_cookie, expire_user_cookie, set_auth_header, validate_user_info } from '@src/lib/auth';

describe('authorization utilities', () => {
    it('verify_jwt verifies get_jwt_token without errors', async () => {
        const jwt_token = await get_jwt_token('admin', 'admin', false);
        const payload = await verify_jwt(jwt_token);
        expect(payload.username == 'admin' && payload.is_admin == false).toBe(true);
    });

    it('set_user_cookie sets user cookie correctly', () => {
        const response = Response.json({});
        const jwt_token = 'my-jwt-token';
        set_user_cookie(response, jwt_token, '/');
        const cookie = response.headers.get('Set-Cookie');

        expect(cookie).not.toBeNull();

        //verify cookie contains all correct fields
        expect(cookie).toMatch(new RegExp(`^${get_user_token_key()}=${jwt_token}`));
        // expect(cookie).toMatch(/`^${get_user_token_key()}=${jwt_token}`/);
        expect(cookie).toMatch(/Path=\//); //short-hand for new RegExp
        expect(cookie).toMatch(/SameSite=strict/);

        expect(cookie).toMatch(new RegExp(`Max-Age=${Math.floor(60 * get_jwt_exp_minutes())}`));

        //verify format of cookie
        expect(cookie).toMatch(/.+=.+; ((.*=?.*);)*(.*=?.*)/);
    });

    it('set_user_cookie sets extended flags correctly in production', () => {
        process.env.NEXT_PUBLIC_RUNNING_LOCAL = 'false';

        const response = Response.json({});
        const jwt_token = 'my-jwt-token';
        set_user_cookie(response, jwt_token, '/');
        const cookie = response.headers.get('Set-Cookie');

        //These flags are only set in production environment
        expect(cookie).toMatch(/HttpOnly/);
        expect(cookie).toMatch(/Secure/);

        process.env.NEXT_PUBLIC_RUNNING_LOCAL = 'true';
    });

    it('set_user_cookie does not set extended flags in development', () => {
        process.env.NEXT_PUBLIC_RUNNING_LOCAL = 'true';

        const response = Response.json({});
        const jwt_token = 'my-jwt-token';
        set_user_cookie(response, jwt_token, '/');
        const cookie = response.headers.get('Set-Cookie');

        //these flags are not set in development
        expect(cookie).not.toMatch(/HttpOnly/);
        expect(cookie).not.toMatch(/Secure/);

        process.env.NEXT_PUBLIC_RUNNING_LOCAL = 'true';
    });

    it('expire_user_cookie expires user cookie correctly', () => {
        const response = Response.json({});
        const jwt_token = 'my-jwt-token';
        expire_user_cookie(response, '/');
        const cookie = response.headers.get('Set-Cookie');

        expect(cookie).not.toBeNull();

        //verify cookie contains all correct fields
        expect(cookie).toMatch(new RegExp(`^${get_user_token_key()}=`));
        // expect(cookie).toMatch(/`^${get_user_token_key()}=${jwt_token}`/);
        expect(cookie).toMatch(/Path=\//); //short-hand for new RegExp
        expect(cookie).toMatch(/Max-Age=0/);

        //verify format of cookie
        expect(cookie).toMatch(/.+=.+; ((.*=?.*);)*(.*=?.*)/);
    });

    it('set_auth_header sets auth header correctly', async () => {
        const token = await get_jwt_token('admin', 'admin', false);

        const response = Response.json({});
        set_auth_header(response, token);
        const auth_header = response.headers.get('Authorization');

        expect(auth_header).toBe('Bearer ' + token);
    });

    it('validate_user_info with user_info is null', async () => {
        const request = new Request('localhost:3000', {});

        const response = validate_user_info(request, false);

        expect(response.response).not.toBeNull();
        expect(response.response?.status).toBe(401);
        expect(response.jwt_info).toBeNull();

        const body = await response.response?.json() as ValidateUserInfoResponse;
        expect(body['message']).toBe('User info not found');
    });

    it('validate_user_info with insufficent permissions', async () => {
        const request = new Request('localhost:3000', {
            headers: {
                User_Info: JSON.stringify({
                    username: 'bob',
                    is_admin: false,
                }),
            },
        });

        const response = validate_user_info(request, true);

        expect(response.response).not.toBeNull();
        expect(response.response?.status).toBe(401);
        expect(response.jwt_info).toMatchObject(
            {
                username: 'bob',
                is_admin: false,
            }
        );

        const body = await response.response?.json() as ValidateUserInfoResponse;
        expect(body['message']).toBe('Insufficent permissions');
    });

    it('validate_user_info with sufficent permissions', () => {
        const request = new Request('localhost:3000', {
            headers: {
                User_Info: JSON.stringify({
                    username: 'admin',
                    is_admin: true,
                }),
            },
        });

        const response = validate_user_info(request, true);
        expect(response.response).toBeNull();
        expect(response.jwt_info).toMatchObject(
            {
                username: 'admin',
                is_admin: true,
            }
        );
    });
});