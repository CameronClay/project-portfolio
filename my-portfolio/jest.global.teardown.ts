//runs once after all test suites run
// import statements in typescript are hoisted to the top of the file

// import '@src/test-setup/jest-environment'; //loads environment variables from .env.local and allows access via process.env
import { Database, set_db_name, drop_db, close_db } from '@src/lib/database/mongodb';
import { Config } from '@jest/types';

export default async function global_teardown(globalConfig: Config.GlobalConfig, projectConfig: Config.ProjectConfig) {
    console.log('[global teardown]');

    set_db_name(Database.test_db);
    await drop_db();
    await close_db();
}