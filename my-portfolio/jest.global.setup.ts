// runs once before all test suites run
// import statements in typescript are hoisted to the top of the file

// import '@src/jest/jest-environment'; //loads environment variables from .env.local and allows access via process.env
// import { Database, set_db_name, drop_db, get_db, create_indexes, validate_schemas } from '@src/lib/database/mongodb';
import { Config } from '@jest/types';

export default async function global_setup(globalConfig: Config.GlobalConfig, projectConfig: Config.ProjectConfig) {
    console.log('[global setup]');

    // set_db_name(Database.test_db);
    // get_db();

    // await create_indexes()
    //     .catch(() => { })
    //     .then(() => { });
    // await validate_schemas()
    //     .catch(() => { })
    //     .then(() => { });
    // await drop_db();
}