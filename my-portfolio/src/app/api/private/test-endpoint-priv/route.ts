import { NextRequest, NextResponse } from "next/server";
import { validate_user_info } from '@src/lib/auth';

export async function GET(request : NextRequest) {
    const {jwt_info, response} = validate_user_info(request, false);
    if(response != null) {
        return response;
    }
    
    return NextResponse.json({ message: "Request from private test endpoint successful" }, { status: 200 });
}