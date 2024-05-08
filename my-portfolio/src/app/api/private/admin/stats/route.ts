import * as stats_db from '@src/lib/database/c_stats';
import { validate_user_info } from '@src/lib/auth';
import { parse_params_resp, Param } from '@src/lib/api/helpers';
import * as api_info from '@src/constants/api/admin-api';

export async function GET(request: Request) {
    const vui_res = validate_user_info(request, true);
    if (vui_res.response != null) {
        return vui_res.response;
    }
    const jwt_info = vui_res.jwt_info;

    const { data, response } = await parse_params_resp(
        request,
        api_info.GET_STATS_PARAMS as Param[]
    );
    if (response !== null) {
        return response;
    }

    const stats = await stats_db.get_stats();

    return Response.json({ stats: stats.map((stat) => stat.to_json()) } as api_info.GetStatsResponse, { status: 200 });
}

export async function DELETE(request: Request) {
    const vui_res = validate_user_info(request, true);
    if (vui_res.response != null) {
        return vui_res.response;
    }
    const jwt_info = vui_res.jwt_info;

    const { data, response } = await parse_params_resp(
        request,
        api_info.CLEAR_STATS_PARAMS as Param[]
    );
    if (response !== null) {
        return response;
    }

    try {
        const result = await stats_db.clear_stats(true);
        if (result.acknowledged) {
            return Response.json({ message: 'Stats cleared' } as api_info.ClearStatsResponse, { status: 200 });
        }
    }
    catch (err) { } /*eslint-disable-line no-empty*/

    return Response.json(
        { message: 'Failed to clear stats' } as api_info.ClearStatsResponse,
        { status: 500 }
    );
}
