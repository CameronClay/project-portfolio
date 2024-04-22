/* eslint @typescript-eslint/no-namespace: "off" */
/* eslint no-var: "off" */

import { MongoClient, ServerApiVersion } from 'mongodb';

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
    }
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

let my_db = 'portfolio';
export enum Collection {
    stats = 'stats',
    users = 'users'
}

export function set_db_name(db: string) {
    my_db = db;
}
export function get_db_name(db: string) {
    return my_db;
}

declare global {
    namespace globalThis {
        var _mongoClientPromise: Promise<MongoClient> | null
    }
}

if (process.env.NODE_ENV === 'development') {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    if (!global._mongoClientPromise) { //global object is a global namespace in javascript it is where global variables/functions are stored
        client = new MongoClient(MONGODB_URI, options);
        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
}
else {
    // In production mode, it's best to not use a global variable.
    client = new MongoClient(MONGODB_URI, options);
    clientPromise = client.connect();
}

export async function get_db() {
    const client = await clientPromise;
    return client.db(my_db);
}

async function create_indexes() {
    const db = await get_db();

    await db.collection(Collection.users).createIndex({
        username: 1
    }, {
        unique: true
    }
    )
}

export async function validate_schema() {
    const db = await get_db();

    await db.command({
        "collMod": "users",
        "validator": {
            $jsonSchema: {
                "bsonType": "object",
                "description": "Document describing a user",
                "required": ["username", "password", "is_admin"],
                "properties": {
                    "username": {
                        "bsonType": "string",
                        "description": "username is a required string"
                    },
                    "password": {
                        "bsonType": "string",
                        "description": "password is a required string"
                    },
                    "is_admin": {
                        "bsonType": "bool",
                        "description": "is_admin is a required bool"
                    }
                },
            }
        }
    })

    await db.command({
        "collMod": "stats",
        "validator": {
            $jsonSchema: {
                "bsonType": "object",
                "description": "Document describing a stat",
                "required": ["ip", "date"],
                "properties": {
                    "ip": {
                        "bsonType": "string",
                        "description": "ip is a required string"
                    },
                    "date": {
                        "bsonType": "number",
                        "description": "date is a required number"
                    },
                },
            }
        }
    })
}

//using void in front of function call makes it return undefined
void create_indexes().catch(() => { }).then(() => { });
void validate_schema().catch(() => { }).then(() => { });

export default clientPromise;