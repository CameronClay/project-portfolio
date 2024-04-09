import { NextRequest, NextResponse } from "next/server";
import * as users_db from '@src/lib/database/c_users';
import { generate, Options } from 'password-hash';

export async function POST(request : NextRequest) {
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

    let result = await users_db.create_user(username, generate(password));

    return NextResponse.json({ 
            user: {
                id      : result.insertedId.toString(),
                username: username
            },
            message  : "Registration successful"
        }, 
    {    
        status: 200 }
    );
}