import { NextRequest, NextResponse } from "next/server";
import * as users_db from '@src/lib/database/c_users';
import { get_jwt_token, set_user_cookie } from '@src/lib/auth';
import { verify, Options } from 'password-hash';

export async function POST(request : NextRequest) {
    const data = await request.json();
    const username = data["username"];
    const password = data["password"];

    if(username == null || password == null) {
        return NextResponse.json({ message: "Missing username or password" }, { status: 401 });
    }

    const user = await users_db.get_user_by_username(username);

    if(user == null) {
        return NextResponse.json({ message: "User not found" }, { status: 401 });
    }

    //check password against hashed password
    if(!verify(password, user.password)) {
        return NextResponse.json({ message: "Invalid password" }, { status: 401 });
    }

    const jwt_token = await get_jwt_token(user._id as string, user.username, user.is_admin);

    const res = NextResponse.json(
        { 
            message  : "Log in successful",
            jwt_token: jwt_token,
            user: {
                id       : user._id as string,
                username : username,
            }
        }, { 
            status: 200
        }
    );

    set_user_cookie(res, jwt_token);

    return res;
}