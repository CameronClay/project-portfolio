import { NextRequest, NextResponse } from 'next/server';
import * as users_db from '@src/lib/database/c_users';
import { verify, Options } from 'password-hash';
import { expire_user_cookie, validate_user_info } from '@src/lib/auth';
import { parse_params_resp, Param } from '@src/lib/api/helpers';
import * as params from '@src/constants/api/public-api-params';

//delete currently logged in user
export async function DELETE(request: NextRequest) {
    const vui_res = validate_user_info(request, false);
    if (vui_res.response != null) {
        return vui_res.response;
    }
    const jwt_info = vui_res.jwt_info;

    const { data, response } = await parse_params_resp(
        request,
        params.delete_user as Param[]
    );
    if (response !== null) {
        return response;
    }

    const password = data['password'] as string;

    if (password == null) {
        return NextResponse.json(
            { message: 'Missing password' },
            { status: 401 }
        );
    }

    const user = await users_db.get_user_by_username(jwt_info.username);

    if (user == null) {
        return NextResponse.json(
            { message: `User: ${jwt_info.username} not found` },
            { status: 404 }
        );
    }

    //check password against hashed password
    if (!verify(password, user.password)) {
        return NextResponse.json(
            { message: 'Invalid password' },
            { status: 401 }
        );
    }

    const result = await users_db.delete_user(jwt_info.user_id);

    if (result.acknowledged && result.deletedCount > 0) {
        const res = NextResponse.json(
            {
                message: `User: ${jwt_info.username} sucessfully deleted`,
            },
            {
                status: 200,
            }
        );

        expire_user_cookie(res); //log out user

        return res;
    } else {
        return NextResponse.json(
            {
                message: `Failed to delete: ${jwt_info.username}`,
            },
            {
                status: 500,
            }
        );
    }
}
