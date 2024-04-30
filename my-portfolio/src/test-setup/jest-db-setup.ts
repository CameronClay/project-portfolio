import { Database, get_db, set_db_name, drop_db, validate_schemas } from '@src/lib/database/mongodb';
// import * as stats_db from '@src/lib/database/c_stats';
// import * as users_db from '@src/lib/database/c_users';

//before any test in a suite runs
beforeEach(async () => {
    console.log('[setupdb beforeAll]');
    set_db_name(Database.test_db);
    // await stats_db.clear_stats();
    // await users_db.clear_users();
    await drop_db();
}, 10000);

// after each test in a suite runs
afterEach(async () => {
    console.log('[setupdb afterEach]');
    await validate_schemas();
}, 10000);

//after each test suite runs
// afterAll(async () => {
//     console.log('[setupdb afterAll]');
//     await drop_db();
// }, 10000);
