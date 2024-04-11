import { NextRequest, NextResponse } from "next/server";
import * as users_db from '@src/lib/database/c_users';
import { validate_user_info } from '@src/lib/auth';

export async function GET(request : NextRequest) {
    const {jwt_info, response} = validate_user_info(request, true);
    if(response != null) {
        return response;
    }

    const users = await users_db.get_users();

    return NextResponse.json({ users: users }, { status: 200 });
}