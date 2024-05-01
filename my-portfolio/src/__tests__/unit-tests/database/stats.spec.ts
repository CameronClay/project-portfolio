import '@src/jest/jest-db-setup';

import * as stats_db from '@/src/lib/database/c_stats';
import { close_db, client } from '@src/lib/database/mongodb';

//test stats collection functions using separate testing database
describe('Stats collection', () => {
    // const set_and_clear_stats = async () => {
    //     const cres = await stats_db.clear_stats();
    //     expect(cres.acknowledged).toBe(true);
    // };

    // beforeEach(async () => {
    //     console.log('[stats collection beforeEach]');

    //     await set_and_clear_stats();
    // }, 10000);

    // afterAll(async () => {
    //     console.log('[stats collection afterAll]');

    //     await set_and_clear_stats();
    // }, 10000);

    it('store and retreive stat', async () => {
        console.log('[stats collection store and retreive stat]');

        // await client?.connect();

        const result = await stats_db.create_stat(1, 'test-ip');
        expect(result.acknowledged).toBe(true);

        const stat = await stats_db.get_stat(result.insertedId.toString());
        expect(stat !== null && stat.ip == 'test-ip' && stat.date == 1).toBe(true);

        // await client?.close();
    });

    it('store and delete stat', async () => {
        console.log('[stats collection store and delete stat]');

        const result = await stats_db.create_stat(1, 'test-ip');
        expect(result.acknowledged).toBe(true);
        const dres = await stats_db.delete_stat(result.insertedId.toString());
        expect(dres.acknowledged).toBe(true);
        const stat = await stats_db.get_stat(result.insertedId.toString());
        expect(stat === null).toBe(true);
    });

    it('store and clear stats', async () => {
        console.log('[stats collection store and clear stats]');

        await stats_db.create_stat(1, 'test-ip');
        await stats_db.create_stat(2, 'test-ip-2');
        const clrres = await stats_db.clear_stats();
        expect(clrres.acknowledged).toBe(true);
        const stats = await stats_db.get_stats();
        expect(stats.length == 0).toBe(true);
    });
});
