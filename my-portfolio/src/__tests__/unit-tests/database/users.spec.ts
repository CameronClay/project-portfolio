import '@src/jest/jest-db-setup';

import * as users_db from '@src/lib/database/c_users';
import { ObjectId } from 'mongodb';

//test users collection functions using separate testing database
describe('Users collection', () => {
    it('store and retreive user', async () => {
        const cres = await users_db.create_user('user1', 'password');
        expect(cres.acknowledged).toBe(true);
        expect(cres.insertedId).not.toBeNull();
        const user = await users_db.get_user(cres.insertedId);
        expect(user !== null && user.username == 'user1').toBe(true);
    });

    it('store and retreive user by username', async () => {
        const cres = await users_db.create_user('user1', 'password');
        expect(cres.acknowledged).toBe(true);
        expect(cres.insertedId).not.toBeNull();
        const user = await users_db.get_user_by_username('user1');
        expect(user !== null && user.username == 'user1').toBe(true);
    });

    it('store and delete user', async () => {
        const cres = await users_db.create_user('user1', 'password');
        expect(cres.acknowledged).toBe(true);
        expect(cres.insertedId).not.toBeNull();
        const dres = await users_db.delete_user(cres.insertedId);
        expect(dres.acknowledged).toBe(true);
        const user = await users_db.get_user(cres.insertedId);
        expect(user === null).toBe(true);
    });

    it('store and delete user by username', async () => {
        const cres = await users_db.create_user('user1', 'password');
        expect(cres.acknowledged).toBe(true);
        expect(cres.insertedId).not.toBeNull();
        const dres = await users_db.delete_user_by_username('user1');
        expect(dres.acknowledged).toBe(true);
        const user = await users_db.get_user(cres.insertedId);
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
        expect(user).toMatchObject({
            _id: expect.any(ObjectId), /* eslint-disable-line @typescript-eslint/no-unsafe-assignment*/
            username: 'user1',
            is_admin: false,
            password: expect.stringMatching(/.+/), /* eslint-disable-line @typescript-eslint/no-unsafe-assignment*/
        });
    });

    it('User.equals should return true', () => {
        const user = new users_db.User('admin', true, 'password', new ObjectId('012345678901234567891234'));
        const user2 = new users_db.User('admin', true, 'password', new ObjectId('012345678901234567891234'));

        expect(user.equals(user2)).toBe(true);
    });

    it('User.equals should return false', () => {
        const user = new users_db.User('admin', true, 'password', new ObjectId('012345678901234567891234'));
        const user2 = new users_db.User('admin', true, 'password', new ObjectId('012345678901234567891235'));

        expect(user.equals(user2)).toBe(false);
    });
});
