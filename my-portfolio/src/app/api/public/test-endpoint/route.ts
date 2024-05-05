import { parse_params_resp, Param } from '@src/lib/api/helpers';
import * as api_info from '@src/constants/api/main-api';

export async function GET(request: Request) {
    const { data, response } = await parse_params_resp(
        request,
        api_info.TEST_PARAMS as Param[]
    );
    if (response !== null) {
        return response;
    }

    return Response.json(
        { message: 'Request from test endpoint successful' } as api_info.TestResponse,
        { status: 200 }
    );
}