import * as api_tadmin from '@src/lib/api/admin';
import * as stats_db from '@src/lib/database/c_stats';

import * as api_info from '@src/constants/api/admin-api';

import '@src/jest/jest-db-setup';
import '@src/jest/jest-server-setup';
import '@src/jest/jest-private-api-setup-all';

describe('stats api', () => {
    it('get_stat should return 200', async () => {
        //make api call
        const res = await stats_db.create_stat(1, '::1');
        expect(res.acknowledged).toBe(true);

        const resp = await api_tadmin.get_stat(res.insertedId.toString());

        //validate response
        const body = await resp.json() as api_info.GetStatResponse;
        expect(stats_db.Stat.from_json(body.stat).equals(new stats_db.Stat(1, '::1', res.insertedId))).toBe(true);
        expect(resp.status).toBe(200);
    });

    it('get_stats should return 200 on empty', async () => {
        //make api call
        const resp = await api_tadmin.get_stats();

        //validate response
        const body = await resp.text();
        expect(body).toMatch(/"stats"\s*:\s*\[\s*\]/);
        expect(resp.status).toBe(200);
    });

    it('get_stats should return 200 with stats', async () => {
        //make api call
        const res = await stats_db.create_stat(1, '::1');
        expect(res.acknowledged).toBe(true);

        const resp = await api_tadmin.get_stats();

        //validate response
        const body = await resp.json() as api_info.GetStatsResponse;
        expect(body.stats).toHaveLength(1);
        expect(stats_db.Stat.from_json(body.stats[0]).equals(new stats_db.Stat(1, '::1', res.insertedId))).toBe(true);
        expect(resp.status).toBe(200);
    });

    it('clear_stats should return 200 and clears stats successfully', async () => {
        //make api call
        const res = await stats_db.create_stat(1, '::1');
        expect(res.acknowledged).toBe(true);

        const resp = await api_tadmin.clear_stats();

        //validate response
        const text = await resp.text();
        expect(text).toMatch(/[Ss]tats cleared/);
        expect(resp.status).toBe(200);

        //validate stats were cleared in the database
        const gres = await stats_db.get_stats();
        expect(gres).toEqual([]);
    });
});