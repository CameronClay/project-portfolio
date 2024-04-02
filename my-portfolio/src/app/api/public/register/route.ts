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

    if(user != null) {
        return NextResponse.json({ message: "Username already exists" }, { status: 401 });
    }

    let response = await users_db.create_user(username, password);
    console.log(user);

    return NextResponse.json({ user: {
        id      : response.insertedId.toString(),
        username: username
    }}, { 
        status: 200 }
    );
}