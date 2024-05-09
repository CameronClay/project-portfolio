//runs once after all test suites run
// import statements in typescript are hoisted to the top of the file

// import '@src/test-setup/jest-environment'; //loads environment variables from .env.local and allows access via process.env
// import { Database, set_db_name, get_db_name, drop_db, close_db, connection } from '@src/lib/database/mongodb';
import { Config } from '@jest/types';

export default async function global_teardown(globalConfig: Config.GlobalConfig, projectConfig: Config.ProjectConfig) {
    console.log('[global teardown]');

    // //for some reason connection is null here
    // //probably because all tests, setup, and teardown are isolated from each other
    // // console.log(get_db_name());
    // if (connection != null) {
    //     console.log('connection not null');
    // }
    // // console.log(connection);

    // // set_db_name(Database.test_db);
    // // await drop_db();
    // await close_db();
}