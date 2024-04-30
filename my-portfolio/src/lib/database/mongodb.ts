/* eslint @typescript-eslint/no-namespace: "off" */
/* eslint no-var: "off" */

import { MongoClient, ServerApiVersion } from 'mongodb';
import { $jsonSchema as stats_schema } from '@/database/schemas/stats.json';
import { $jsonSchema as users_schema } from '@/database/schemas/users.json';

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
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

export enum Database {
    portfolio = 'portfolio',
    test_db = 'test_db',
}

let my_db = Database.portfolio;
export enum Collection {
    stats = 'stats',
    users = 'users',
}

//set the current database name
export function set_db_name(db: Database) {
    my_db = db;
}

//get the current database name
export function get_db_name() {
    return my_db;
}

//drops the database and waits for it to be dropped
export async function drop_db(force: boolean = false) {
    if (get_db_name() == Database.portfolio && !force) {
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
    const client = await clientPromise;
    return client.db(my_db);
}

//creates database indexes
async function create_indexes() {
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

//returns true if the database exists
export async function database_exists(database: Database) {
    const db = await get_db();
    return (await db.admin().listDatabases({ dbName: database })).databases.length > 0;
}

//returns true if the collection exists
export async function collection_exists(collection: Collection) {
    const client = await clientPromise;
    const db = await get_db();

    // return (await db.listCollections().toArray()).filter((c) => {
    //     return c.name == collection;
    // }).length > 0;
    const result = await db.listCollections({ name: collection }).next();
    return !!result; //!! converts value to boolean
}

export async function validate_schema(collection: Collection, schema: object) {
    if (await database_exists(get_db_name())) {
        if (await collection_exists(collection)) {
            const db = await get_db();
            await db.command({
                collMod: collection,
                validator: {
                    $jsonSchema: schema,
                },
            });
        }
    }
}

//validates the schema
export async function validate_schemas() {
    await validate_schema(Collection.users, users_schema);
    await validate_schema(Collection.stats, stats_schema);
}

//close database connection and prevent any further operations
export async function close_db() {
    const client = await clientPromise;
    await client.close();
}

//--------------------mongo db setup-----------------------
declare global {
    namespace globalThis {
        var _mongoClientPromise: Promise<MongoClient> | null;
    }
}

if (process.env.NODE_ENV === 'development') {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    if (!global._mongoClientPromise) {
        //global object is a global namespace in javascript it is where global variables/functions are stored
        client = new MongoClient(MONGODB_URI, options);
        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
} else {
    // In production mode, it's best to not use a global variable.
    client = new MongoClient(MONGODB_URI, options);
    clientPromise = client.connect();
}

//using void in front of function call makes it return undefined (without causes eslint error by not awaiting function call)
void create_indexes()
    .catch(() => { })
    .then(() => { });
void validate_schemas()
    .catch(() => { })
    .then(() => { });

export default clientPromise;
