import * as users_db from '@src/lib/database/c_users';
import { verify, Options } from 'password-hash';
import { expire_user_cookie, validate_user_info } from '@src/lib/auth';
import { parse_params_resp, Param } from '@src/lib/api/helpers';
import * as api_info from '@src/constants/api/main-api';
import { GenericResponse } from '@src/constants/api/generic';
import { PROTECTED_PATH } from '@src/constants/auth-constants';
import { ObjectId } from 'mongodb';

//delete currently logged in user
export async function DELETE(request: Request) {
    const vui_res = validate_user_info(request, false);
    if (vui_res.response != null) {
        return vui_res.response;
    }
    const jwt_info = vui_res.jwt_info;

    const { data, response } = await parse_params_resp(
        request,
        api_info.DELETE_USER_PARAMS as Param[]
    );
    if (response !== null) {
        return response;
    }

    const password = data['password'] as string;

    if (password == null) {
        return Response.json({ message: 'Missing password' } as GenericResponse, { status: 422 });
    }

    const user = await users_db.get_user_by_username(jwt_info.username);

    if (user == null) {
        return Response.json(
            { message: `User: ${jwt_info.username} not found` } as GenericResponse,
            { status: 404 }
        );
    }

    //check password against hashed password
    if (!verify(password, user.password as string)) {
        return Response.json({ message: 'Invalid password' } as GenericResponse, { status: 401 });
    }

    const result = await users_db.delete_user(new ObjectId(jwt_info.user_id));

    if (result.acknowledged && result.deletedCount > 0) {
        const res = Response.json(
            {
                message: `User: ${jwt_info.username} successfully deleted`,
            } as api_info.DeleteUserResponse,
            {
                status: 200,
            }
        );

        expire_user_cookie(res, PROTECTED_PATH); //log out user

        return res;
    } else {
        return Response.json(
            {
                message: `Failed to delete: ${jwt_info.username}`,
            } as api_info.DeleteUserResponse,
            {
                status: 500,
            }
        );
    }
}