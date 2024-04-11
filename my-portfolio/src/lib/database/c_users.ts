import clientPromise from '@src/lib/database/mongodb';
import { ObjectId, type WithId } from 'mongodb'

// export type User = {
//     _id      : number,
//     username : string,
//     password : string,
//     is_admin : boolean
// }

export class User {
    constructor(public username : string, public password : string, public is_admin : boolean, public _id? : string) {
        // this.username = username;
        // this.password = password;
        // this.is_admin = is_admin;
        // this.id = id;
    }
}

export async function get_users() {
    const client = await clientPromise;
    const db = client.db("portfolio");
    let users = (await db.collection<User>("users").find({}).project({ username: 1 }).toArray());
    return users;
}

export async function get_user(user_id : string) {
    const client = await clientPromise;
    const db = client.db("portfolio");
    const user = (await db.collection<User>("users").findOne({
        _id: new ObjectId(user_id)
    }, {
         projection: { username: 1 } 
    })) as User | null;
    return user;
}

export async function get_user_by_username(username : string) {
    const client = await clientPromise;
    const db = client.db("portfolio");
    const user = (await db.collection<User>("users").findOne({username: username})) as User;
    return user;
}


export async function create_user(username : string, password : string, is_admin : boolean = false) {
    const client = await clientPromise
    const db = client.db("portfolio")
    const result = (await db.collection<User>("users").insertOne({
        username: username,
        password: password,
        is_admin: is_admin
    }));
    return result;
}

export async function update_user(user_id : string, new_username : string | null, new_password : string | null) {
    const client = await clientPromise;
    const db = client.db("portfolio");
    let update : any = {};
    if(new_username != null) {
        update["username"] = new_username;
    }
    if(new_password != null) {
        update["password"] = new_password;
    }
    let result = await db.collection<User>("users").updateOne({_id: new ObjectId(user_id)}, {
        $set: update
    });
    return result;
}

export async function update_user_by_username(username : string, new_username : string | null, new_password : string | null) {
    const client = await clientPromise;
    const db = client.db("portfolio");
    let update : any = {};
    if(new_username != null) {
        update["username"] = new_username;
    }
    if(new_password != null) {
        update["password"] = new_password;
    }
    let result = await db.collection<User>("users").updateOne({username: username}, {
        $set: update
    });
    return result;
}

export async function delete_user(user_id : string) {
    const client = await clientPromise;
    const db = client.db("portfolio");
    const result = (await db.collection<User>("users").deleteOne({_id: new ObjectId(user_id)}));
    return result;
}


export async function delete_user_by_username(username : string) {
    const client = await clientPromise;
    const db = client.db("portfolio");
    const result = (await db.collection<User>("users").deleteOne({username: username}));
    return result;
}


export async function clear_users() {
    const client = await clientPromise;
    const db = client.db("portfolio");
    const result = (await db.collection<User>("users").deleteMany({}));
    return result;
}