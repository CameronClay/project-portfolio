import '@testing-library/jest-dom';
import { afterEach, after } from 'node:test';
import { set_db_name, validate_schema } from '@src/lib/database/mongodb';
import * as stats_db from '@src/lib/database/c_stats';

describe('Stats collection', () => {
    const set_and_clear_stats = async () => {
        set_db_name('test-db');
        await stats_db.clear_stats();
    };

    beforeEach(async () => {
        await set_and_clear_stats();
    });

    afterEach(async () => {
        await validate_schema();
    });

    after(async () => {
        await set_and_clear_stats();
    });

    it('store and retreive stat', async () => {
        const result = await stats_db.create_stat(1, 'test-ip');
        expect(result.acknowledged).toBe(true);
        const stat = await stats_db.get_stat(result.insertedId.toString());
        expect(stat !== null && stat.ip == 'test-ip' && stat.date == 1).toBe(true);
    });

    it('store and delete stat', async () => {
        const result = await stats_db.create_stat(1, 'test-ip');
        expect(result.acknowledged).toBe(true);
        const dres = await stats_db.delete_stat(result.insertedId.toString());
        expect(dres.acknowledged).toBe(true);
        const stat = await stats_db.get_stat(result.insertedId.toString());
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
})