import * as api_tmain from '@src/lib/api/main';

import '@src/jest/jest-db-setup';
import '@src/jest/jest-server-setup';

describe('public misc api', () => {
    it('test-endpoint should return 200', async () => {
        //make api call
        const resp = await api_tmain.get_test_endpoint();

        //validate response
        const text = await resp.text();
        expect(text).toMatch(/[Rr]equest from test endpoint successful/);
        expect(resp.status).toBe(200);
    });
})