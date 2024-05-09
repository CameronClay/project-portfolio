import * as stats_db from '@src/lib/database/c_stats';
import { validate_user_info } from '@src/lib/auth';
import { parse_params_resp, Param } from '@src/lib/api/helpers';
import * as api_info from '@src/constants/api/admin-api';
import { ObjectId } from 'mongodb';
import { GenericResponse } from '@src/constants/api/generic';

export async function GET(request: Request) {
    const vui_res = validate_user_info(request, true);
    if (vui_res.response != null) {
        return vui_res.response;
    }
    const jwt_info = vui_res.jwt_info;

    const { data, response } = await parse_params_resp(
        request,
        api_info.GET_STAT_PARAMS as Param[]
    );
    if (response !== null) {
        return response;
    }

    const entry_id = data['entry_id'] as string;
    const stat = await stats_db.get_stat(new ObjectId(entry_id));

    if (stat == null) {
        return Response.json(
            { message: 'Stat not found' } as GenericResponse,
            { status: 404 }
        );
    }

    return Response.json({ stat: stat.to_json() } as api_info.GetStatResponse, { status: 200 });
}