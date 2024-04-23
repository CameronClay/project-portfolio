import { NextRequest, NextResponse } from 'next/server';
import { expire_user_cookie, validate_user_info } from '@src/lib/auth';
import { parse_params_resp, Param } from '@src/lib/api/helpers';
import * as params from '@src/constants/api/public-api-params';

export async function POST(request: NextRequest) {
    const vui_res = validate_user_info(request, false);
    if (vui_res.response != null) {
        return vui_res.response;
    }
    const jwt_info = vui_res.jwt_info;

    const { data, response } = await parse_params_resp(
        request,
        params.logout_user as Param[]
    );
    if (response !== null) {
        return response;
    }

    const res = NextResponse.json(
        {
            message: 'Log out successful',
            user: {
                id: jwt_info.user_id,
            },
        },
        {
            status: 200,
        }
    );

    expire_user_cookie(res);

    return res;
}
