import * as api_tadmin from '@src/lib/api/admin';
import * as users_db from '@src/lib/database/c_users';
import * as api_info from '@/src/constants/api/admin-api';

import '@src/jest/jest-db-setup';
import '@src/jest/jest-server-setup';
import '@src/jest/jest-private-api-setup-all';

describe('admin users api', () => {
    it('get_users should return 200 and yield users', async () => {
        //create user
        const cres = await users_db.create_user('admin', 'my-password', true);
        expect(cres.acknowledged).toBe(true);

        //make api call
        const resp = await api_tadmin.get_users();

        //validate response
        expect(resp.status).toBe(200);
        const body = await resp.json() as api_info.GetUsersResponse;
        expect(body.users).toHaveLength(1);
        const user = users_db.User.from_json(body.users[0]);
        expect(user.equals(new users_db.User('admin', true, undefined, cres.insertedId))).toBe(true);
    });

    it('get_user should return 200 and yield user', async () => {
        //create user
        const cres = await users_db.create_user('admin', 'my-password', true);
        expect(cres.acknowledged).toBe(true);

        //make api call
        const resp = await api_tadmin.get_user_by_id(cres.insertedId.toString());

        //validate response
        expect(resp.status).toBe(200);
        const body = await resp.json() as api_info.GetUserResponse;
        const user = users_db.User.from_json(body.user);
        expect(user.equals(new users_db.User('admin', true, undefined, cres.insertedId))).toBe(true);
    });

    it('update_user should return 401 with wrong password', async () => {
        //create user
        const cres = await users_db.create_user('admin', 'my-password', true);
        expect(cres.acknowledged).toBe(true);

        //make api call
        const resp = await api_tadmin.update_user_by_username('admin', 'mypassword', 'admin2');

        //validate response
        expect(resp.status).toBe(401);
        const text = await resp.text();
        expect(text).toMatch(/[Ii]nvalid password/);
    });

    it('update_user should return 404 with non-existent user', async () => {
        //make api call
        const resp = await api_tadmin.update_user_by_username('admin', 'my-password', 'admin2');

        //validate response
        expect(resp.status).toBe(404);
        const text = await resp.text();
        expect(text).toMatch(/admin not found/);
    });

    it('update_user should return 200 and update user with new username', async () => {
        //create user
        const cres = await users_db.create_user('admin', 'my-password', true);
        expect(cres.acknowledged).toBe(true);

        //make api call
        const resp = await api_tadmin.update_user_by_username('admin', 'my-password', 'admin2');

        //validate response
        expect(resp.status).toBe(200);
        const text = await resp.text();
        expect(text).toMatch(/admin successfully updated/);

        //validate new password and validate user was updated properly in database
        const res = await users_db.get_user_by_username('admin2');
        expect(res).toBeTruthy();
        expect((res as users_db.User).equals(new users_db.User('admin2', true, res?.password, cres.insertedId))).toBe(true);
    });

    it('update_user should return 200 and update user with new password', async () => {
        //create user
        const cres = await users_db.create_user('admin', 'my-password', true);
        expect(cres.acknowledged).toBe(true);

        //make api call
        const resp = await api_tadmin.update_user_by_username('admin', 'my-password', undefined, 'new-password');

        //validate response
        expect(resp.status).toBe(200);
        const text = await resp.text();
        expect(text).toMatch(/admin successfully updated/);

        //validate new password and validate user was updated properly in database
        const res = await users_db.get_user_by_username('admin');
        expect(res).toBeTruthy();
        expect((res as users_db.User).equals(new users_db.User('admin', true, res?.password, cres.insertedId))).toBe(true);
    });

    it('update_user should return 200 and update user with new username and password', async () => {
        //create user
        const cres = await users_db.create_user('admin', 'my-password', true);
        expect(cres.acknowledged).toBe(true);

        //make api call
        const resp = await api_tadmin.update_user_by_username('admin', 'my-password', 'admin2', 'new-password');

        //validate response
        expect(resp.status).toBe(200);
        const text = await resp.text();
        expect(text).toMatch(/admin successfully updated/);

        //validate new password and validate user was updated properly in database
        const res = await users_db.get_user_by_username('admin2');
        expect(res).toBeTruthy();
        expect((res as users_db.User).equals(new users_db.User('admin2', true, res?.password, cres.insertedId))).toBe(true);
    });

    it('delete_user should return 200 and delete existing user', async () => {
        //create user
        const cres = await users_db.create_user('fred', 'my-password', true);
        expect(cres.acknowledged).toBe(true);

        //make api call
        const resp = await api_tadmin.delete_user_by_username('fred', 'my-password');

        //validate response
        expect(resp.status).toBe(200);
        const text = await resp.text();
        expect(text).toMatch(/fred successfully deleted/);

        //validate user was deleted
        const dres = await users_db.get_user_by_username('fred');
        expect(dres).toBeNull();
    });

    it('delete_user should return 401 with invalid password', async () => {
        //create user
        const cres = await users_db.create_user('fred', 'my-password', true);
        expect(cres.acknowledged).toBe(true);

        //make api call
        const resp = await api_tadmin.delete_user_by_username('fred', 'my-password2');

        //validate response
        expect(resp.status).toBe(401);
        const text = await resp.text();
        expect(text).toMatch(/[Ii]nvalid password/);
    });

    it('delete_user should return 404 on non-existent user', async () => {
        //make api call
        const resp = await api_tadmin.delete_user_by_username('fred', 'my-password');

        //validate response
        expect(resp.status).toBe(404);
        const text = await resp.text();
        expect(text).toMatch(/fred not found/);
    });
});