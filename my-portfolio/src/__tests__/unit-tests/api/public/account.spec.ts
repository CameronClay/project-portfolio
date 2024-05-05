import * as api_tmain from '@src/lib/api/main';
import * as users_db from '@src/lib/database/c_users';

import '@src/jest/jest-db-setup';
import '@src/jest/jest-server-setup';
import * as api_info from '@/src/constants/api/main-api';

describe('public account api', () => {
    it('register should return 200 with non-existent user', async () => {
        //make api call
        const resp = await api_tmain.register('admin', 'my-password');

        //validate response
        const body = await resp.json() as api_info.RegisterUserResponse;
        expect(body.message).toMatch(/[Rr]egistration successful/);
        expect(resp.status).toBe(200);

        const user = users_db.User.from_json(body.user);
        expect(user).toMatchObject({
            username: 'admin',
            password: undefined
        })
    });

    it('register should return 401 with existing user', async () => {
        //make api call
        let resp = await api_tmain.register('admin', 'my-password');

        //validate response
        let text = await resp.text();
        expect(text).toMatch(/[Rr]egistration successful/);
        expect(resp.status).toBe(200);

        //make api call
        resp = await api_tmain.register('admin', 'my-password');

        //validate response
        text = await resp.text();
        expect(text).toMatch(/[Uu]sername already exists/);
        expect(resp.status).toBe(401);
    });

    it('login should return 200 with valid credentials', async () => {
        //create user
        const cres = await users_db.create_user('admin', 'my-password', true);
        expect(cres.acknowledged).toBe(true);

        //make api call
        const resp = await api_tmain.login('admin', 'my-password');

        //validate response
        const body = await resp.json() as api_info.LoginUserResponse;
        expect(body.message).toMatch(/[Ll]og in successful/)
        expect(body.jwt_token).toBeTruthy();

        const user = users_db.User.from_json(body.user);
        expect(user._id?.equals(cres.insertedId)).toBe(true);
        expect(user.username).toBe('admin');

        expect(resp.status).toBe(200);
    });

    it('login should return 401 with invalid credentials', async () => {
        //create user
        const cres = await users_db.create_user('admin', 'my-password', true);
        expect(cres.acknowledged).toBe(true);

        //make api call
        const resp = await api_tmain.login('admin', 'my-password2');

        //validate response
        const body = await resp.json() as api_info.LoginUserResponse;
        expect(body.message).toMatch(/[Ii]nvalid password/)
        expect(body.jwt_token).toBeFalsy();
        expect(resp.status).toBe(401);
    });

    it('login should return 404 with non-existent user', async () => {
        //make api call
        const resp = await api_tmain.login('admin', 'my-password');

        //validate response
        const text = await resp.text();
        expect(text).toMatch(/[Uu]ser not found/);
        expect(resp.status).toBe(404);
    });
});