import * as api_tmain from '@src/lib/api/main';
import * as users_db from '@src/lib/database/c_users';
import * as api_info from '@src/constants/api/main-api';
import { AuthResponse } from '@src/constants/api/generic';

import '@src/jest/setup/db-setup';
import '@src/jest/setup/server-setup';
import '@src/jest/setup/private-api-setup-each';

describe('private account api', () => {
    it('logout should return 200 when user is logged in', async () => {
        //make api call
        const resp = await api_tmain.logout();

        //validate response
        const body = await resp.json() as api_info.LogoutUserResponse;
        expect(body.message).toMatch(/[Ll]og out successful/);
        expect(resp.status).toBe(200);

        const user = users_db.User.from_json(body.user);
        expect(user).toBeTruthy();
        expect(user.username).toBe('admin');
    });

    it('logout should return 401 with no user logged in', async () => {
        //make api call
        let resp = await api_tmain.logout();

        //validate response
        expect(resp.status).toBe(200);

        //make api call
        resp = await api_tmain.logout();

        //validate response
        const body = await resp.json() as AuthResponse;
        expect(body.message).toMatch(/[Uu]nauthorized/);
        expect(body.auth_msg).toMatch(/[Cc]ookie not present in request/)
        expect(resp.status).toBe(401);
    });

    it('update_user should return 401 with wrong password', async () => {
        //make api call
        const resp = await api_tmain.update_user('mypassword', 'admin2', 'new-password');

        //validate response
        const text = await resp.text();
        expect(text).toMatch(/[Ii]nvalid password/);
        expect(resp.status).toBe(401);
    });

    it('update_user should return 404 with non-existent user', async () => {
        //delete user
        const dres = await users_db.delete_user_by_username('admin');
        expect(dres.acknowledged).toBe(true);

        //make api call
        const resp = await api_tmain.update_user('my-password', 'admin2', 'new-password');

        //validate response
        const text = await resp.text();
        expect(text).toMatch(/admin not found/);
        expect(resp.status).toBe(404);
    });

    it('update_user should return 200 and update user with new username', async () => {
        //make api call
        const resp = await api_tmain.update_user('my-password', 'admin2', undefined);

        //validate response
        const text = await resp.text();
        expect(text).toMatch(/admin successfully updated/);
        expect(resp.status).toBe(200);

        //validate new password and validate user was updated properly in database
        const res = await users_db.get_user_by_username('admin2');
        expect(res).toBeTruthy();
        expect((res as users_db.User).equals(new users_db.User('admin2', true, res?.password, res?._id))).toBe(true);
    });

    it('update_user should return 200 and update user with new password', async () => {
        //make api call
        const resp = await api_tmain.update_user('my-password', undefined, 'new-password');

        //validate response
        const text = await resp.text();
        expect(text).toMatch(/admin successfully updated/);
        expect(resp.status).toBe(200);

        //validate new password and validate user was updated properly in database
        const res = await users_db.get_user_by_username('admin');
        expect(res).toBeTruthy();
        expect((res as users_db.User).equals(new users_db.User('admin', true, res?.password, res?._id))).toBe(true);
    });

    it('update_user should return 200 and update user with new username and password', async () => {
        //make api call
        const resp = await api_tmain.update_user('my-password', 'admin2', 'new-password');

        //validate response
        const text = await resp.text();
        expect(text).toMatch(/admin successfully updated/);
        expect(resp.status).toBe(200);

        //validate new password and validate user was updated properly in database
        const res = await users_db.get_user_by_username('admin2');
        expect(res).toBeTruthy();
        expect((res as users_db.User).equals(new users_db.User('admin2', true, res?.password, res?._id))).toBe(true);
    });

    it('update_user should return 422 with no new data', async () => {
        //make api call
        const resp = await api_tmain.update_user('my-password');

        //validate response
        const text = await resp.text();
        expect(text).toMatch(/[Ee]ither new password or new username is required/);
        expect(resp.status).toBe(422);
    });

    it('delete_user should return 200 and delete existing user', async () => {
        //make api call
        const resp = await api_tmain.delete_user('my-password');

        //validate response
        const text = await resp.text();
        expect(text).toMatch(/admin successfully deleted/);
        expect(resp.status).toBe(200);

        //validate user was deleted
        const dres = await users_db.get_user_by_username('admin');
        expect(dres).toBeNull();
    });

    it('delete_user should return 401 with incorrect password', async () => {
        //make api call
        const resp = await api_tmain.delete_user('my-password2');

        //validate response
        const text = await resp.text();
        expect(text).toMatch(/[Ii]nvalid password/);
        expect(resp.status).toBe(401);
    });

    it('delete_user should return 401 when not logged in', async () => {
        //make api call
        let resp = await api_tmain.logout();

        //validate response
        expect(resp.status).toBe(200);
        const text = await resp.text();
        expect(text).toMatch(/[Ll]og out successful/);

        //make api call
        resp = await api_tmain.delete_user('my-password');

        //validate response
        const body = await resp.json() as AuthResponse;
        expect(body.message).toMatch(/[Uu]nauthorized/);
        expect(body.auth_msg).toMatch(/[Cc]ookie not present in request/);
        expect(resp.status).toBe(401);
    });
});