import { NextRequest, NextResponse } from "next/server";
import * as stats_db from '@src/lib/database/c_stats';
import { validate_user_info } from '@src/lib/auth';
import { parse_params_resp, Param } from '@src/lib/api/helpers';
import * as params from '@src/constants/api/admin-api-params';

export async function GET(request: NextRequest) {
    const vui_res = validate_user_info(request, false);
    if (vui_res.response != null) {
        return vui_res.response;
    }
    const jwt_info = vui_res.jwt_info;

    const { data, response } = await parse_params_resp(request, params.get_stat as Param[]);
    if (response !== null) {
        return response;
    }

    const entry_id = data["entry_id"] as string;
    const stat = await stats_db.get_stat(entry_id);

    return NextResponse.json({ stat: stat }, { status: 200 });
}