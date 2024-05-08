import '@src/jest/setup/db-setup';
import '@src/jest/setup/server-setup';
import '@src/jest/setup/private-api-setup-all';

import { parse_params_resp, Param } from '@src/lib/api/helpers';
import * as api_info from '@src/constants/api/main-api';

describe('api utils', () => {
    it('update_user should return 422 with missing parameter', async () => {
        const request = new Request('localhost:3000', {
            method: 'PATCH',
            body: JSON.stringify({
            }),
        });

        const { data, response } = await parse_params_resp(
            request,
            api_info.UPDATE_USER_PARAMS as Param[]
        );

        //validate response
        expect(data).toEqual({});
        expect(response).not.toBeNull();
        const resp = response as Response;
        const body = await resp.json() as { message: string };
        expect(body.message).toMatch(/[Mm]issing parameter password/);
        expect(resp.status).toBe(422);
    });

    it('update_user should return 422 with invalid parameter type', async () => {
        const request = new Request('localhost:3000', {
            method: 'PATCH',
            body: JSON.stringify({
                password: 123
            }),
        });

        const { data, response } = await parse_params_resp(
            request,
            api_info.UPDATE_USER_PARAMS as Param[]
        );

        //validate response
        expect(data).toEqual({});
        expect(response).not.toBeNull();
        const resp = response as Response;
        const body = await resp.json() as { message: string };
        expect(body.message).toMatch(/[Ii]nvalid type for password \(expected string\) \(got number\)/);
        expect(resp.status).toBe(422);
    });
});