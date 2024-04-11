import { NextRequest, NextResponse } from "next/server";
import { expire_user_cookie, validate_user_info } from '@src/lib/auth';

export async function POST(request : NextRequest) {
    const {jwt_info, response} = validate_user_info(request, false);
    if(response != null) {
        return response;
    }

    const res = NextResponse.json({ user: {
        message  : "Log out successful",
        id       : jwt_info.user_id as string
    }}, { 
        status: 200 }
    );

    expire_user_cookie(res);

    return res;
}