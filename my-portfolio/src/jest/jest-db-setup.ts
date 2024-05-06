import { Database, get_db, setup_db, drop_db, validate_schemas, close_db, create_indexes, validate_schema } from '@src/lib/database/mongodb';
import { get_user_token_key } from '../constants/auth-constants';
import { PROTECTED_PATH } from '@src/constants/auth-constants';
import * as users_db from '@src/lib/database/c_users';
import * as stats_db from '@src/lib/database/c_stats';

import { store as cookieStore } from "@mswjs/cookies";

function clear_cookies() {
    // console.log('[clear_cookies] cookies=', document.cookie, ", cookieStore=", cookieStore);
    document.cookie.split(";").forEach((cookie) => {
        document.cookie = cookie
            .replace(/^ +/, "")
            .replace(/=.*/, `=;expires=${new Date(0).toUTCString()}`);
    });
    cookieStore.clear();
}

//before each test suite runs
beforeAll(async () => {
    // console.log('[setupdb beforeAll]');
    await setup_db(Database.TEST_DB);

    //expire cookies between test suites
    clear_cookies();

    await create_indexes();
    await validate_schemas();
});

//before each test in a suite runs
beforeEach(async () => {
    // console.log('[setupdb beforeEach]');
    // clearing collections seems to be needed for some reason
    // await stats_db.clear_stats();
    // await users_db.clear_users();
    await drop_db();
});

//after each test suite runs
afterAll(async () => {
    // console.log('[setupdb afterAll]');
    await close_db();
});