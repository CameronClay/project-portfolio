import { NextRequest, NextResponse } from "next/server";
import * as users_db from '@src/lib/database/c_users';
import { generate, verify, Options } from 'password-hash';
import { validate_user_info } from '@src/lib/auth';

//get user
export async function GET(request : NextRequest) {
    const {jwt_info, response} = validate_user_info(request, true);
    if(response != null) {
        return response;
    }

    const url = new URL(request.url);
    if (url.searchParams.get("user_id") == null) {
        return NextResponse.json({ message: "Expected user_id" }, { status: 422 });
    }

    // const data = await request.json()
    // if (data["user_id"] == null) {
    //     return NextResponse.json({ message: "Expected user_id" }, { status: 422 });
    // }
    // const user_id = +(data["user_id"] as string)//+ operator converts string to number (can also use parseInt)
    const user_id = (url.searchParams.get("user_id") as string);
    const user = await users_db.get_user(user_id);

    return NextResponse.json({ user: user }, { status: 200 });
}

//delete user
export async function DELETE(request : NextRequest) {
    const {jwt_info, response} = validate_user_info(request, true);
    if(response != null) {
        return response;
    }

    const data = await request.json();
    const username = data["username"];
    const password = data["password"];

    if(username == null || password == null) {
        return NextResponse.json({ message: "Missing username or password" }, { status: 401 });
    }

    const user = await users_db.get_user_by_username(username);

    if(user == null) {
        return NextResponse.json({ message: `User: ${username} not found` }, { status: 404 });
    }

    //check password against hashed password
    if(!verify(password, user.password)) {
        return NextResponse.json({ message: "Invalid password" }, { status: 401 });
    }

    const result = await users_db.delete_user_by_username(username);

    if(result.acknowledged && result.deletedCount > 0) {
        return NextResponse.json({
            message: `User: ${username} sucessfully deleted`
        }, { 
            status: 200 }
        );
    }
    else {
        return NextResponse.json({
             message: `Failed to delete: ${username}` 
        }, {
             status: 500 
        });
    }
}

//update user
export async function PATCH(request : NextRequest) {
    const {jwt_info, response} = validate_user_info(request, true);
    if(response != null) {
        return response;
    }

    const data = await request.json();
    const username = data["username"];
    const password = data["password"];
    const new_username = data["new_username"];
    const new_password = data["new_password"];

    if(username == null || password == null) {
        return NextResponse.json({ message: "Missing username or password" }, { status: 401 });
    }
    if(new_username == null && new_password == null) {
        return NextResponse.json({ message: "Either new password or new username is required" }, { status: 401 });
    }

    const user = await users_db.get_user_by_username(username);

    if(user == null) {
        return NextResponse.json({ message: `User: ${username} not found` }, { status: 404 });
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

    const result = await users_db.update_user_by_username(username, new_username, generate(new_password));

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