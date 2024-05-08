import * as api_tmiddlware from '@src/lib/api/middleware';

import '@src/jest/setup/db-setup';
import '@src/jest/setup/server-setup';

import * as api_info from '@src/constants/api/middleware-api';

describe('middleware api', () => {
    it('create_stat should return 200', async () => {
        //make api call
        const resp = await api_tmiddlware.create_stat(Date.now(), '::1');

        //validate response
        const body = await resp.json() as api_info.CreateStatResponse;
        expect(body.message).toMatch(/[Ss]tat created successfully/);
        expect(body._id.toString().length).toBeGreaterThan(0);
    });
});