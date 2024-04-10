import { NextRequest, NextResponse } from "next/server";
import * as users_db from '@src/lib/database/c_users';
import { verify, Options } from 'password-hash';
import { expire_user_cookie, validate_user_info } from '@src/lib/auth';

//delete currently logged in user
export async function DELETE(request : NextRequest) {
    const {jwt_info, response} = validate_user_info(request, false);
    if(response != null) {
        return response;
    }

    const data = await request.json();
    const password = data["password"];

    if(password == null) {
        return NextResponse.json({ message: "Missing password" }, { status: 401 });
    }

    const user = await users_db.get_user_by_username(jwt_info.username);

    if(user == null) {
        return NextResponse.json({ message: `User: ${jwt_info.username} not found` }, { status: 404 });
    }

    //check password against hashed password
    if(!verify(password, user.password)) {
        return NextResponse.json({ message: "Invalid password" }, { status: 401 });
    }

    const result = await users_db.delete_user(jwt_info.user_id);

    if(result.acknowledged && result.deletedCount > 0) {
        let res = NextResponse.json({
            message: `User: ${jwt_info.username} sucessfully deleted`
        }, { 
            status: 200 }
        );

        expire_user_cookie(res); //log out user

        return res;
    }
    else {
        return NextResponse.json({
             message: `Failed to delete: ${jwt_info.username}` 
        }, {
             status: 500 
        });
    }
}