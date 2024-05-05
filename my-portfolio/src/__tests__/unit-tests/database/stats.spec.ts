import '@src/jest/jest-db-setup';

import * as stats_db from '@/src/lib/database/c_stats';
import { ObjectId } from 'mongodb';

//test stats collection functions using separate testing database
describe('Stats collection', () => {
    it('store and retreive stat', async () => {
        const result = await stats_db.create_stat(1, 'test-ip');
        expect(result.acknowledged).toBe(true);

        const stat = await stats_db.get_stat(result.insertedId);
        expect(stat !== null && stat.ip == 'test-ip' && stat.date == 1).toBe(true);
    });

    it('store and delete stat', async () => {
        const result = await stats_db.create_stat(1, 'test-ip');
        expect(result.acknowledged).toBe(true);
        const dres = await stats_db.delete_stat(result.insertedId);
        expect(dres.acknowledged).toBe(true);
        const stat = await stats_db.get_stat(result.insertedId);
        expect(stat === null).toBe(true);
    });

    it('store and clear stats', async () => {
        await stats_db.create_stat(1, 'test-ip');
        await stats_db.create_stat(2, 'test-ip-2');
        const clrres = await stats_db.clear_stats();
        expect(clrres.acknowledged).toBe(true);
        const stats = await stats_db.get_stats();
        expect(stats.length == 0).toBe(true);
    });

    it('Stat.equals should return true', () => {
        const stat = new stats_db.Stat(1, 'test-ip', new ObjectId('012345678901234567891234'));
        const stat2 = new stats_db.Stat(1, 'test-ip', new ObjectId('012345678901234567891234'));

        expect(stat.equals(stat2)).toBe(true);
    });

    it('Stat.equals should return false', () => {
        const stat = new stats_db.Stat(1, 'test-ip', new ObjectId('012345678901234567891234'));
        const stat2 = new stats_db.Stat(1, 'test-ip', new ObjectId('012345678901234567891235'));

        expect(stat.equals(stat2)).toBe(false);
    });
});
