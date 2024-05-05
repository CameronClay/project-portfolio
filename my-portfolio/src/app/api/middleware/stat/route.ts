import * as stats_db from '@/src/lib/database/c_stats';
import { parse_params_resp, Param } from '@src/lib/api/helpers';
import * as api_info from '@src/constants/api/middleware-api';

export async function POST(request: Request) {
    const { data, response } = await parse_params_resp(
        request,
        api_info.CREATE_STAT_PARAMS as Param[]
    );
    if (response !== null) {
        return response;
    }

    const date = data['date'] as number;
    const ip = data['ip'] as string;

    const resp = await stats_db.create_stat(date, ip);

    return Response.json(
        {
            _id: resp.insertedId,
            message: 'Stat created successfully',
        } as api_info.CreateStatResponse,
        {
            status: 200,
        }
    );
}
