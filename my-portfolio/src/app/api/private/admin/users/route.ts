import { NextRequest, NextResponse } from "next/server";
import * as users_db from '@src/lib/database/c_users';
import { validate_user_info } from '@src/lib/auth';
import { parse_params_resp, Param } from '@src/lib/api/helpers';
import * as params from '@src/constants/api/admin-api-params';

export async function GET(request: NextRequest) {
    const vui_res = validate_user_info(request, false);
    if (vui_res.response != null) {
        return vui_res.response;
    }
    const jwt_info = vui_res.jwt_info;

    const { data, response } = await parse_params_resp(request, params.get_users as Param[]);
    if (response !== null) {
        return response;
    }

    const users = await users_db.get_users();

    return NextResponse.json({ users: users }, { status: 200 });
}