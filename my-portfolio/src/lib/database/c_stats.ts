import { get_db, Collection, get_db_name, Database } from '@src/lib/database/mongodb';
import { ObjectId } from 'mongodb';
import 'mongodb';

// export class StatBase {
//     constructor(
//         public readonly date: number,
//         public readonly ip: string,
//     ) { }

//     public equals(rhs: StatBase): boolean {
//         return this.ip === rhs.ip &&
//             this.date === rhs.date;
//     }
// }

export interface StatBase {
    readonly date: number;
    readonly ip: string;
}

export type AStat = StatBase & { _id: string };

export class Stat implements StatBase {
    // constructor(
    //     readonly date: number,
    //     readonly ip: string,
    //     public readonly _id?: ObjectId
    // ) {
    //     super(date, ip);
    // }

    // public to_stat_base(): StatBase {
    //     return new StatBase(this.date, this.ip);
    // }

    // public equals(rhs: Stat): boolean {
    //     return super.equals(rhs) &&
    //         this._id?.equals(rhs._id) === true;
    // }

    constructor(
        public readonly date: number,
        public readonly ip: string,
        public readonly _id?: ObjectId
    ) { }

    public equalsBase(rhs: StatBase): boolean {
        return this.date === rhs.date &&
            this.ip === rhs.ip;
    }

    public equals(rhs: Stat): boolean {
        return this.equalsBase(rhs) &&
            this._id?.equals(rhs._id) === true;
    }

    public static from_json(json: AStat): Stat {
        return new Stat(
            json.date,
            json.ip,
            new ObjectId(json._id),
        );
    }
    public to_json(): AStat {
        return {
            date: this.date,
            ip: this.ip,
            _id: this._id?.toString(),
        } as AStat;
    }
}

export async function get_stats() {
    const db = await get_db();

    return (await db
        .collection<Stat>(Collection.stats)
        .find()
        .map((stat) => new Stat(stat.date, stat.ip, stat._id))
        .toArray());
}

export async function get_stat(entry_id: ObjectId) {
    const db = await get_db();

    const stat = (await db
        .collection<Stat>(Collection.stats)
        .findOne({ _id: entry_id })) as Stat | null;

    if (stat === null) {
        return null;
    }

    return new Stat(stat.date, stat.ip, stat._id);
}

export async function create_stat(date: number, ip: string) {
    const db = await get_db();

    // const result = await db.collection<Stat>(Collection.stats).insertOne({
    //     ip: ip,
    //     date: date,
    // });

    const result = await db.collection<Stat>(Collection.stats).insertOne(new Stat(date, ip));

    return result;
}

export async function delete_stat(entry_id: ObjectId) {
    const db = await get_db();

    const result = await db
        .collection<Stat>(Collection.stats)
        .deleteOne({ _id: entry_id });

    return result;
}

export async function clear_stats(force: boolean = false) {
    if (get_db_name() == Database.PORTFOLIO && !force) {
        throw new Error(`Cannot clear stats in ${Database.PORTFOLIO} without force being true`);
    }

    const db = await get_db();

    const result = await db.collection<Stat>(Collection.stats).deleteMany({});
    return result;
}