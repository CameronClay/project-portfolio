import { get_db, Collection } from '@src/lib/database/mongodb';
import { ObjectId } from 'mongodb';

// export type User = {
//     _id      : number,
//     username : string,
//     password : string,
//     is_admin : boolean
// }

export class User {
    constructor(
        public username: string,
        public password: string,
        public is_admin: boolean,
        public _id?: ObjectId
    ) {
        // this.username = username;
        // this.password = password;
        // this.is_admin = is_admin;
        // this.id = id;
    }
}

export async function get_users() {
    const db = await get_db();

    const users = await db
        .collection<User>(Collection.users)
        .find({})
        .project({ username: 1 })
        .toArray();
    return users;
}

//only projects username
export async function get_user(user_id: string) {
    const db = await get_db();

    const user = (await db.collection<User>(Collection.users).findOne(
        {
            _id: new ObjectId(user_id),
        },
        {
            projection: { username: 1 },
        }
    )) as User | null;
    return user;
}

export async function get_user_by_username(username: string) {
    const db = await get_db();

    const user = (await db
        .collection<User>(Collection.users)
        .findOne({ username: username })) as User;
    return user;
}

export async function create_user(
    username: string,
    password: string,
    is_admin: boolean = false
) {
    const db = await get_db();

    const result = await db.collection<User>(Collection.users).insertOne({
        username: username,
        password: password,
        is_admin: is_admin,
    });
    return result;
}

export async function update_user(
    user_id: string,
    new_username: string | null,
    new_password: string | null
) {
    const db = await get_db();

    const update: Record<string, string> = {};
    if (new_username != null) {
        update['username'] = new_username;
    }
    if (new_password != null) {
        update['password'] = new_password;
    }
    const result = await db.collection<User>(Collection.users).updateOne(
        { _id: new ObjectId(user_id) },
        {
            $set: update,
        }
    );
    return result;
}

export async function update_user_by_username(
    username: string,
    new_username: string | null,
    new_password: string | null
) {
    const db = await get_db();

    const update: Record<string, string> = {};
    if (new_username != null) {
        update['username'] = new_username;
    }
    if (new_password != null) {
        update['password'] = new_password;
    }
    const result = await db.collection<User>(Collection.users).updateOne(
        { username: username },
        {
            $set: update,
        }
    );
    return result;
}

export async function delete_user(user_id: string) {
    const db = await get_db();

    const result = await db
        .collection<User>(Collection.users)
        .deleteOne({ _id: new ObjectId(user_id) });
    return result;
}

export async function delete_user_by_username(username: string) {
    const db = await get_db();

    const result = await db
        .collection<User>(Collection.users)
        .deleteOne({ username: username });
    return result;
}

export async function clear_users() {
    const db = await get_db();

    const result = await db.collection<User>(Collection.users).deleteMany({});
    return result;
}
