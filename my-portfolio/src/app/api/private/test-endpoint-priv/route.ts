import { validate_user_info } from '@src/lib/auth';
import { parse_params_resp, Param } from '@src/lib/api/helpers';
import * as api_info from '@src/constants/api/main-api';

export async function GET(request: Request) {
    const vui_res = validate_user_info(request, false);
    if (vui_res.response != null) {
        return vui_res.response;
    }
    const jwt_info = vui_res.jwt_info;

    const { data, response } = await parse_params_resp(
        request,
        api_info.TEST_PRIV_PARAMS as Param[]
    );
    if (response !== null) {
        return response;
    }

    return Response.json(
        { message: 'Request from private test endpoint successful' } as api_info.TestPrivResponse,
        { status: 200 }
    );
}
