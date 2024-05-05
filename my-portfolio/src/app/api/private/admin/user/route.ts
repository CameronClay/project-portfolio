import * as users_db from '@src/lib/database/c_users';
import { generate, verify, Options } from 'password-hash';
import { validate_user_info, expire_user_cookie } from '@src/lib/auth';
import { parse_params_resp, Param } from '@src/lib/api/helpers';
import * as api_info from '@src/constants/api/admin-api';
import { GenericResponse } from '@src/constants/api/generic';
import { PROTECTED_PATH } from '@src/constants/auth-constants';
import { ObjectId } from 'mongodb';

//get user
export async function GET(request: Request) {
    const vui_res = validate_user_info(request, true);
    if (vui_res.response != null) {
        return vui_res.response;
    }
    const jwt_info = vui_res.jwt_info;

    const { data, response } = await parse_params_resp(
        request,
        api_info.GET_USER_PARAMS as Param[]
    );
    if (response !== null) {
        return response;
    }

    const user_id = data['user_id'] as string;
    const user = await users_db.get_user(new ObjectId(user_id));

    return Response.json({ user: user }, { status: 200 });
}

//delete user
export async function DELETE(request: Request) {
    const vui_res = validate_user_info(request, true);
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

    const username = data['username'] as string;
    const password = data['password'] as string;

    const user = await users_db.get_user_by_username(username);

    if (user == null) {
        return Response.json(
            { message: `User: ${username} not found` } as GenericResponse,
            { status: 404 }
        );
    }

    //check password against hashed password
    if (!verify(password, user.password as string)) {
        return Response.json({ message: 'Invalid password' } as GenericResponse, { status: 401 });
    }

    const result = await users_db.delete_user_by_username(username);

    if (result.acknowledged && result.deletedCount > 0) {
        const res = Response.json(
            {
                message: `User: ${username} successfully deleted`,
            } as api_info.DeleteUserResponse,
            {
                status: 200,
            }
        );

        if (username === jwt_info.username) {
            expire_user_cookie(res, PROTECTED_PATH); //log out user
        }

        return res;
    } else {
        return Response.json(
            {
                message: `Failed to delete: ${username}`,
            } as api_info.DeleteUserResponse,
            {
                status: 500,
            }
        );
    }
}

//update user
export async function PATCH(request: Request) {
    const vui_res = validate_user_info(request, true);
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

    const username = data['username'] as string;
    const password = data['password'] as string;
    const new_username =
        (data['new_username'] as string)?.length > 0
            ? (data['new_username'] as string)
            : null;
    const new_password =
        (data['new_password'] as string)?.length > 0
            ? (data['new_password'] as string)
            : null;

    if (new_username == null && new_password == null) {
        return Response.json(
            { message: 'Either new password or new username is required' } as GenericResponse,
            { status: 422 }
        );
    }

    const user = await users_db.get_user_by_username(username);

    if (user == null) {
        return Response.json(
            { message: `User: ${username} not found` } as GenericResponse,
            { status: 404 }
        );
    }

    if (new_username != null) {
        const new_user = await users_db.get_user_by_username(new_username);
        if (new_user != null) {
            return Response.json(
                { message: `User: ${new_username} already exists` } as GenericResponse,
                { status: 401 }
            );
        }
    }

    //check password against hashed password
    if (!verify(password, user.password as string)) {
        return Response.json({ message: 'Invalid password' } as GenericResponse, { status: 401 });
    }

    const result = await users_db.update_user_by_username(
        username,
        new_username,
        new_password ? generate(new_password) : null
    );

    if (result.acknowledged && result.modifiedCount > 0) {
        return Response.json(
            {
                message: `User: ${username} successfully updated`,
            } as api_info.UpdateUserResponse,
            {
                status: 200,
            }
        );
    } else {
        return Response.json(
            {
                message: `Failed to update: ${username}`,
            } as api_info.UpdateUserResponse,
            {
                status: 500,
            }
        );
    }
}
