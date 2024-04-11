import clientPromise from '@src/lib/database/mongodb';
import { ObjectId } from 'mongodb';

//https://orangematter.solarwinds.com/2019/12/22/what-is-mongodbs-id-field-and-how-to-use-it/

// export type Stat = {
//     _id    : number,
//     ip     : string,
//     date   : Date
// }

export class Stat {
    constructor(public ip : string, public date : number, public _id? : number) {
        // this.ip = ip;
        // this.date = date;
        // this.id = id;
    }
}

export async function get_stats() {
    const client = await clientPromise;
    const db = client.db("portfolio");
    return (await db.collection<Stat>("stats").find().toArray()) as Stat[];
}

export async function get_stat(entry_id : string) {
    const client = await clientPromise;
    const db = client.db("portfolio");
    const stat = await db.collection<Stat>("stats").findOne({_id: new ObjectId(entry_id)}) as Stat | null;
    return stat
}

export async function create_stat(date : number, ip : string) {
    const client = await clientPromise;
    const db = client.db("portfolio");
    const result = (await db.collection<Stat>("stats").insertOne({
        ip     : ip,
        date   : date
    }));
    return result;
}

export async function clear_stats() {
    const client = await clientPromise;
    const db = client.db("portfolio");
    const result = (await db.collection<Stat>("stats").deleteMany({}));
    return result;
}