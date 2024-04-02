import { MongoClient, ServerApiVersion } from 'mongodb'

if (!process.env.MONGODB_URI) {
    throw new Error('Missing MONGODB_URI in .env.local')
}

const MONGODB_URI = process.env.MONGODB_URI
const options = {
    connectTimeoutMS: 1000,
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
}

let client : MongoClient
let clientPromise : Promise<MongoClient>

declare global {
    namespace globalThis {
      var _mongoClientPromise: Promise<MongoClient>
    }
}

if (process.env.NODE_ENV === 'development') {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    if (!global._mongoClientPromise) { //global object is a global namespace in javascript it is where global variables/functions are stored
        client = new MongoClient(MONGODB_URI, options)
        global._mongoClientPromise = client.connect()
    }
    clientPromise = global._mongoClientPromise
} 
else {
    // In production mode, it's best to not use a global variable.
    client = new MongoClient(MONGODB_URI, options)
    clientPromise = client.connect()
}

async function create_indexes() {
    const client = await clientPromise;
    const db = client.db("portfolio");
    await db.collection("users").createIndex({username: 1}, {unique: true})
}

create_indexes()

export default clientPromise

// const init_db = async () => {
//     const MONGODB_URI = process.env.MONGODB_URI as string;

//     const db_client = new MongoClient(MONGODB_URI, {
//         connectTimeoutMS: 1000,
//         serverApi: {
//             version: ServerApiVersion.v1,
//             strict: true,
//             deprecationErrors: true,
//         }
//     });
    
//     const db_connection = await db_client.connect()
//     return db_connection
// }


// export {db_client, db_connection}
