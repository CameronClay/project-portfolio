import * as api_tadmin from '@src/lib/api/admin';
import * as users_db from '@src/lib/database/c_users';

import '@src/jest/setup/db-setup';
import '@src/jest/setup/server-setup';

describe('middleware tests', () => {
    it('get_users should return 401 when not authenticated', async () => {
        //create user
        const cres = await users_db.create_user('admin', 'my-password', true);
        expect(cres.acknowledged).toBe(true);

        //make api call
        const resp = await api_tadmin.get_users();

        //validate response
        const text = await resp.text();
        expect(text).toMatch(/[Cc]ookie not present in request/);
        expect(resp.status).toBe(401);
    });
});