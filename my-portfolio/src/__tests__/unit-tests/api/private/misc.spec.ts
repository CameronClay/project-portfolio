import * as api_tmain from '@src/lib/api/main';

import '@src/jest/setup/db-setup';
import '@src/jest/setup/server-setup';
import '@src/jest/setup/private-api-setup-all';

describe('private misc api', () => {
    it('test-endpoint-private should return 200', async () => {
        //make api call
        const resp = await api_tmain.get_test_endpoint_priv();

        //validate response
        const text = await resp.text();
        expect(text).toMatch(/[Rr]equest from private test endpoint successful/);
        expect(resp.status).toBe(200);
    });
})