import '@testing-library/jest-dom';
import { after, afterEach } from 'node:test';
import { set_db_name, validate_schema } from '@src/lib/database/mongodb';
import * as users_db from '@src/lib/database/c_users';

//test users collection functions using separate testing database
describe('Users collection', () => {
    const set_and_clear_users = async () => {
        set_db_name('test-db');
        await users_db.clear_users();
    };

    beforeEach(async () => {
        await set_and_clear_users();
    });

    afterEach(async () => {
        await validate_schema();
    });

    after(async () => {
        await set_and_clear_users();
    });

    it('store and retreive user', async () => {
        const cres = await users_db.create_user('user1', 'password');
        expect(cres.acknowledged).toBe(true);
        const user = await users_db.get_user(cres.insertedId.toString());
        expect(user !== null && user.username == 'user1').toBe(true);
    });

    it('store and retreive user by username', async () => {
        const cres = await users_db.create_user('user1', 'password');
        expect(cres.acknowledged).toBe(true);
        const user = await users_db.get_user_by_username('user1');
        expect(user !== null && user.username == 'user1').toBe(true);
    });

    it('store and delete user', async () => {
        const cres = await users_db.create_user('user1', 'password');
        expect(cres.acknowledged).toBe(true);
        const dres = await users_db.delete_user(cres.insertedId.toString());
        expect(dres.acknowledged).toBe(true);
        const user = await users_db.get_user(cres.insertedId.toString());
        expect(user === null).toBe(true);
    });

    it('store and delete user by username', async () => {
        const cres = await users_db.create_user('user1', 'password');
        expect(cres.acknowledged).toBe(true);
        const dres = await users_db.delete_user_by_username('user1');
        expect(dres.acknowledged).toBe(true);
        const user = await users_db.get_user(cres.insertedId.toString());
        expect(user === null).toBe(true);
    });

    it('store and clear users', async () => {
        await users_db.create_user('user1', 'password');
        await users_db.create_user('user2', 'password1');
        const clrres = await users_db.clear_users();
        expect(clrres.acknowledged).toBe(true);
        const users = await users_db.get_users();
        expect(users.length == 0).toBe(true);
    });

    it('get user by username', async () => {
        await users_db.create_user('user1', 'password');
        const user = await users_db.get_user_by_username('user1');
        expect(user !== null && user.username == 'user1' && user.password == 'password').toBe(true);
    });
})