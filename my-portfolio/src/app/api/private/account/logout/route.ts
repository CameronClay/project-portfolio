import { expire_user_cookie, validate_user_info } from '@src/lib/auth';
import { parse_params_resp, Param } from '@src/lib/api/helpers';
import * as api_info from '@src/constants/api/main-api';
import { PROTECTED_PATH } from '@src/constants/auth-constants';
import { AUser } from '@src/lib/database/c_users';

export async function POST(request: Request) {
    const vui_res = validate_user_info(request, false);
    if (vui_res.response != null) {
        return vui_res.response;
    }
    const jwt_info = vui_res.jwt_info;

    const { data, response } = await parse_params_resp(
        request,
        api_info.LOGOUT_USER_PARAMS as Param[]
    );
    if (response !== null) {
        return response;
    }

    const res = Response.json(
        {
            message: 'Log out successful',
            user: {
                username: jwt_info.username,
                is_admin: jwt_info.is_admin,
                _id: jwt_info.user_id,
            } as AUser,
        } as api_info.LogoutUserResponse,
        {
            status: 200,
        }
    );

    expire_user_cookie(res, PROTECTED_PATH);

    return res;
}
