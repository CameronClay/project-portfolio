import * as users_db from '@src/lib/database/c_users';
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
        api_info.GET_USERS_PARAMS as Param[]
    );
    if (response !== null) {
        return response;
    }

    const users = await users_db.get_users();

    return Response.json({ users: users.map((user) => user.to_json()) } as api_info.GetUsersResponse, { status: 200 });
}