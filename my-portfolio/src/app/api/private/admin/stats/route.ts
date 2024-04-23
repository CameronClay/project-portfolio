import { NextRequest, NextResponse } from 'next/server';
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

    const { data, response } = await parse_params_resp(
        request,
        params.get_stats as Param[]
    );
    if (response !== null) {
        return response;
    }

    const stats = await stats_db.get_stats();

    return NextResponse.json({ stats: stats }, { status: 200 });
}

export async function DELETE(request: NextRequest) {
    const vui_res = validate_user_info(request, false);
    if (vui_res.response != null) {
        return vui_res.response;
    }
    const jwt_info = vui_res.jwt_info;

    const { data, response } = await parse_params_resp(
        request,
        params.clear_stats as Param[]
    );
    if (response !== null) {
        return response;
    }

    const result = await stats_db.clear_stats();
    if (result.acknowledged) {
        return NextResponse.json({ message: 'Stats cleared' }, { status: 200 });
    } else {
        return NextResponse.json(
            { message: 'Failed to clear stats' },
            { status: 500 }
        );
    }
}
