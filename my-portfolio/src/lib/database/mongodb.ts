/* eslint @typescript-eslint/no-namespace: "off" */
/* eslint no-var: "off" */

import { MongoClient, ServerApiVersion } from 'mongodb';
import stats_schema from '@/database/schemas/stats.json';
import users_schema from '@/database/schemas/users.json';
import { is_running_with_jest } from '@src/jest/jest-utils';

if (!process.env.MONGODB_URI) {
    throw new Error('Missing MONGODB_URI in .env.local');
}

const MONGODB_URI = process.env.MONGODB_URI;
const options = {
    connectTimeoutMS: 1000,
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
    maxPoolSize: process.env.MONGO_MAX_POOL_SIZE ? parseInt(process.env.MONGO_MAX_POOL_SIZE) : 1,
};

// let client: MongoClient;
// let clientPromise: Promise<MongoClient>;

export let client: MongoClient | null = null;
export let connection: MongoClient | null = null;

export enum Database {
    PORTFOLIO = 'portfolio',
    TEST_DB = 'test_db',
}

let my_db: Database | null = null;
// let my_db = Database.test_db;
export enum Collection {
    stats = 'stats',
    users = 'users',
}

//change active database and initialize indexes and validate schemas
export async function setup_db(db: Database) {
    if (my_db != db) {
        // console.log('[setup_db]: ' + db);
        my_db = db;

        await create_indexes();
        await validate_schemas();
    }
}

//get the active database name
export function get_db_name() {
    return my_db;
}

//drops the active database and waits for it to be dropped
export async function drop_db(force: boolean = false) {
    if (get_db_name() == Database.PORTFOLIO && !force) {
        throw new Error(`Cannot drop db ${get_db_name()} without force being true`);
    }

    const db = await get_db();
    const res = await db.dropDatabase();

    if (!res) {
        throw new Error(`Could not drop database ${get_db_name()}`);
    }
}

//returns current database instance corresponding to the current database name (creates the database if it does not exist)
export async function get_db() {
    if (my_db == null) {
        throw new Error('Cannot get db connection because my_db is null');
    }

    if (connection == null) {
        // console.log('Connecting to the db...');
        connection = await MongoClient.connect(MONGODB_URI, options);
    }

    return connection.db(my_db);

    // const client = await clientPromise;
    // return (client as MongoClient).db(my_db);
    // return client.db(my_db);
}

//creates database indexes for the active database
export async function create_indexes() {
    const db = await get_db();

    await db.collection(Collection.users).createIndex(
        {
            username: 1,
        },
        {
            unique: true,
        }
    );
}

//returns true if the active database exists
export async function database_exists(database: Database) {
    const db = await get_db();
    return (await db.admin().listDatabases({ dbName: database })).databases.length > 0;
}

//returns true if the collection exists
export async function collection_exists(collection: Collection) {
    const db = await get_db();

    // return (await db.listCollections().toArray()).filter((c) => {
    //     return c.name == collection;
    // }).length > 0;
    const result = await db.listCollections({ name: collection }).next();
    return !!result; //!! converts value to boolean
}

export async function validate_schema(collection: Collection, schema: object) {
    const db = await get_db();

    //my_db cannot be null here because it is validated in get_db
    // if (await database_exists(my_db as Database)) {
    if (await collection_exists(collection)) {
        const db = await get_db();
        await db.command({
            collMod: collection,
            validator: {
                $jsonSchema: schema,
            },
        });
    }
    // }
}

//validates the schema
export async function validate_schemas() {
    await validate_schema(Collection.users, users_schema.$jsonSchema);
    await validate_schema(Collection.stats, stats_schema.$jsonSchema);
}

//close database connection and prevent any further operations
export async function close_db() {
    // console.log('[close_db] start');

    if (connection != null) {
        // console.log('[close_db] closing connection');
        await connection.close();
        connection = null;
    }

    await client?.close(true);
    client = null;

    // console.log('[close_db] end');
}

// //--------------------mongo db setup-----------------------
// declare global {
//     namespace globalThis {
//         var _mongoClientPromise: Promise<MongoClient> | null;
//     }
// }

// if (process.env.NODE_ENV === 'development') {
//     // In development mode, use a global variable so that the value
//     // is preserved across module reloads caused by HMR (Hot Module Replacement).
//     if (!global._mongoClientPromise) {
//         //global object is a global namespace in javascript it is where global variables/functions are stored
//         client = new MongoClient(MONGODB_URI, options);
//         global._mongoClientPromise = client.connect();
//     }
//     clientPromise = global._mongoClientPromise;
// } else {
//     // In production mode, it's best to not use a global variable.
//     client = new MongoClient(MONGODB_URI, options);
//     clientPromise = client.connect();
// }

// export default clientPromise;


client = new MongoClient(MONGODB_URI, options);

//only setup db if not running in jest otherwise it causes issues with cleanup
if (!is_running_with_jest()) {
    //using void in front of function call makes it return undefined (without causes eslint error by not awaiting function call)
    void setup_db(Database.PORTFOLIO);
}

//having these calls globally causes jest to stall
// void create_indexes()
//     .catch(() => { })
//     .then(() => { });
// void validate_schemas()
//     .catch(() => { })
//     .then(() => { });
