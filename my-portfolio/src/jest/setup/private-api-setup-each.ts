/* eslint-disable jest/no-standalone-expect */

import * as users_db from '@src/lib/database/c_users';
import * as api_tmain from '@src/lib/api/main';

import { LoginUserResponse } from '@src/constants/api/main-api';

//login user before running each test
beforeEach(async () => {
    //create user so can get a login cookie
    const cres = await users_db.create_user('admin', 'my-password', true);
    expect(cres.acknowledged).toBe(true);

    //login user (cookie is saved)
    const resp = await api_tmain.login('admin', 'my-password'); //note this password is only used to access the dummy test db so password being in code is not an issue

    //validate response
    const body = await resp.json() as LoginUserResponse;
    expect(body.message).toMatch(/[Ll]og in successful/);
    expect(body.jwt_token).toBeTruthy();

    const user = users_db.User.from_json(body.user);
    expect(user).toMatchObject({
        username: 'admin',
        is_admin: true,
        _id: cres.insertedId
    });

    expect(resp.status).toBe(200);
});