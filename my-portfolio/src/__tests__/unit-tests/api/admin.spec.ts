import * as api_tmain from '@src/lib/api/main';
import * as api_tadmin from '@src/lib/api/admin';

import '@src/test-setup/jest-db-setup';
import '@src/test-setup/jest-server-setup';

describe('/api/private/admin/stats', () => {
    beforeEach(async () => {
        console.log('[api/private/admin/stats beforeEach]');
        //register user if doesnt exist
        let resp = await api_tmain.register('admin', 'my-password');
        console.log('[api/private/admin/stats beforeEach] register resp' + JSON.stringify(resp));

        //login user
        resp = await api_tmain.login('admin', 'my-password'); //note this password is only used to access the dummy test db so password being in code is not an issue
        console.log('[api/private/admin/stats beforeEach] login resp' + JSON.stringify(resp));
    }, 10000);

    it('should return 200 on GET', async () => {
        console.log('[api/private/admin/stats test]');
        const resp = await api_tadmin.get_stats();
        console.log('api/private/admin/stats should return 200 on GET] resp' + JSON.stringify(resp));
        expect(resp.status).toBe(200);
    });

    // it('should return 200 on DELETE', async () => {
    //     const resp = await api_tadmin.clear_stats();
    //     expect(resp.status).toBe(200);
    // });
});