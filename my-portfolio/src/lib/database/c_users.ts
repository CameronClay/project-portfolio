import { get_db, Collection, get_db_name, Database } from '@src/lib/database/mongodb';
import { ObjectId } from 'mongodb';
import { generate, Options } from 'password-hash';

// export class UserBase {
//     constructor(public readonly username: string,
//         public readonly is_admin: boolean,
//         public readonly password?: string
//     ) { }

//     public equals(rhs: UserBase): boolean {
//         return this.username === rhs.username &&
//             this.is_admin === rhs.is_admin &&
//             this.password === rhs.password;
//     }
// }

export interface UserBase {
    readonly username: string;
    readonly is_admin: boolean;
    readonly password?: string;
}

export type AUser = UserBase & { _id: string };

export class User implements UserBase {
    // constructor(
    //     readonly username: string,
    //     readonly is_admin: boolean,
    //     readonly password?: string,
    //     public readonly _id?: ObjectId
    // ) {
    //     super(username, is_admin, password);
    // }

    // public equals(rhs: User): boolean {
    //     return super.equals(rhs) &&
    //         this._id?.equals(rhs._id) === true;
    // }

    // public to_user_base(): UserBase {
    //     return new UserBase(this.username, this.is_admin, this.password);
    // }

    constructor(
        public readonly username: string,
        public readonly is_admin: boolean,
        public readonly password?: string,
        public readonly _id?: ObjectId
    ) { }

    public equalsBase(rhs: UserBase): boolean {
        return this.username === rhs.username &&
            this.is_admin === rhs.is_admin &&
            this.password === rhs.password;
    }

    public equals(rhs: User): boolean {
        return this.equalsBase(rhs) &&
            this._id?.equals(rhs._id) === true;
    }

    public static from_json(json: AUser): User {
        return new User(
            json.username,
            json.is_admin,
            json.password,
            new ObjectId(json._id),
        );
    }
    public to_json(): AUser {
        return {
            username: this.username,
            is_admin: this.is_admin,
            // password: this.password, //dont return password to api
            _id: this._id?.toString()
        } as AUser;
    }
}

export async function get_users() {
    const db = await get_db();

    const users = await db
        .collection<User>(Collection.users)
        .find({})
        .project({ _id: 1, username: 1, is_admin: 1 }).map(
            (user) => new User((user as User).username, (user as User).is_admin, undefined, (user as User)._id)
        )
        .toArray();

    return users;
}

//does not project password
export async function get_user(user_id: ObjectId) {
    const db = await get_db();

    const user = (await db.collection<User>(Collection.users).findOne(
        {
            _id: user_id,
        },
        {
            projection: { _id: 1, username: 1, is_admin: 1 },
        }
    )) as User | null;

    if (user === null) {
        return null;
    }

    //does not return user object with functions
    return new User(user.username, user.is_admin, user.password, user._id);
}

export async function get_user_by_username(username: string) {
    const db = await get_db();

    //does not return user object with functions
    const user = (await db
        .collection<User>(Collection.users)
        .findOne({ username: username })) as User | null;

    if (user === null) {
        return null;
    }

    return new User(user.username, user.is_admin, user.password, user._id);
}

export async function create_user(
    username: string,
    password: string,
    is_admin: boolean = false
) {
    const db = await get_db();

    const result = await db.collection<User>(Collection.users).insertOne(
        new User(username, is_admin, generate(password))
    );

    // const result = await db.collection<User>(Collection.users).insertOne({
    //     username: username,
    //     password: generate(password),
    //     is_admin: is_admin,
    // });

    return result;
}

export async function update_user(
    user_id: ObjectId,
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
        { _id: user_id },
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

export async function delete_user(user_id: ObjectId) {
    const db = await get_db();

    const result = await db
        .collection<User>(Collection.users)
        .deleteOne({ _id: user_id });
    return result;
}

export async function delete_user_by_username(username: string) {
    const db = await get_db();

    const result = await db
        .collection<User>(Collection.users)
        .deleteOne({ username: username });

    return result;
}

export async function clear_users(force: boolean = false) {
    if (get_db_name() == Database.PORTFOLIO && !force) {
        throw new Error(`Cannot clear users in ${Database.PORTFOLIO} without force being true`);
    }

    const db = await get_db();

    const result = await db.collection<User>(Collection.users).deleteMany({});
    return result;
}
