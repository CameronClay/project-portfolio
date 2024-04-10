import { NextRequest, NextResponse } from "next/server";
import * as users_db from '@src/lib/database/c_users';
import { generate, verify, Options } from 'password-hash';
import { validate_user_info } from '@src/lib/auth';

//update currently logged in user
export async function PATCH(request : NextRequest) {
    const {jwt_info, response} = validate_user_info(request, false);
    if(response != null) {
        return response;
    }

    const data = await request.json();
    const password = data["password"];
    const new_username = (data["new_username"] as string)?.length > 0 ? data["new_username"] : null;
    const new_password = (data["new_password"] as string)?.length > 0 ? data["new_password"] : null;

    if(password == null) {
        return NextResponse.json({ message: "Missing password" }, { status: 401 });
    }
    if(new_username == null && new_password == null) {
        return NextResponse.json({ message: "Either new password or new username is required" }, { status: 401 });
    }

    const user = await users_db.get_user_by_username(jwt_info.username);

    if(user == null) {
        return NextResponse.json({ message: `User: ${jwt_info.username} not found` }, { status: 404 });
    }

    if(new_username != null) {
        const new_user = await users_db.get_user_by_username(new_username);
        if(new_user != null) {
            return NextResponse.json({ message: `User: ${new_username} already exists` }, { status: 401 });
        }
    }

    //check password against hashed password
    if(!verify(password, user.password)) {
        return NextResponse.json({ message: "Invalid password" }, { status: 401 });
    }

    const result = await users_db.update_user(jwt_info.user_id, new_username, generate(new_password));

    if(result.acknowledged && result.modifiedCount > 0) {
        return NextResponse.json({
            message: `User: ${jwt_info.username} sucessfully updated`
        }, { 
            status: 200 }
        );
    }
    else {
        return NextResponse.json({
             message: `Failed to update: ${jwt_info.username}` 
        }, {
             status: 500 
        });
    }
}