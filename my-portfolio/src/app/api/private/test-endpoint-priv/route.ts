import { NextRequest, NextResponse } from "next/server";
import { validate_user_info } from '@src/lib/auth';
import { parse_params_resp, Param } from '@src/lib/api/helpers';
import * as params from '@src/constants/api/public-api-params';

export async function GET(request : NextRequest) {
    const { data, response } = await parse_params_resp(request, params.test_priv as Param[]);
    if(response !== null) {
        return response;
    }

    const vui_res = validate_user_info(request, false);
    if(vui_res.response != null) {
        return vui_res.response;
    }   
    const jwt_info = vui_res.jwt_info;
    
    return NextResponse.json({ message: "Request from private test endpoint successful" }, { status: 200 });
}