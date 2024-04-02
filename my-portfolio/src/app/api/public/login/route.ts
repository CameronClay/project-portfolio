import { NextResponse } from "next/server";
import * as users_db from '@src/lib/database/c_users';

export async function POST(request : Request) {
    const data = await request.json();
    const username = data["username"];
    const password = data["password"];

    if(username == null || password == null) {
        return NextResponse.json({ message: "Missing username or password" }, { status: 401 });
    }

    const user = await users_db.get_user_by_username(username);

    //check password against hashed password here

    if(user == null) {
        return NextResponse.json({ message: "User not found" }, { status: 401 });
    }

    return NextResponse.json({ user: {
        id      : user.id,
        username: user.username
    }}, { 
        status: 200 }
    );
}