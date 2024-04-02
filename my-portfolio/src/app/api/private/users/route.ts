import { NextResponse } from "next/server";
import * as users_db from '@src/lib/database/c_users';

export async function GET(request : Request) {
    const users = await users_db.get_users();

    return NextResponse.json({ users: users }, { status: 200 });
}