import { NextRequest, NextResponse } from 'next/server';
import * as users_db from '@src/lib/database/c_users';
import { get_jwt_token, set_user_cookie } from '@src/lib/auth';
import { verify, Options } from 'password-hash';
import { ObjectId } from 'mongodb';
import { parse_params_resp, Param } from '@src/lib/api/helpers';
import * as params from '@src/constants/api/public-api-params';

export async function POST(request: NextRequest) {
    const { data, response } = await parse_params_resp(
        request,
        params.login_user as Param[]
    );
    if (response !== null) {
        return response;
    }

    const username = data['username'] as string;
    const password = data['password'] as string;

    const user = await users_db.get_user_by_username(username);

    if (user == null) {
        return NextResponse.json(
            { message: 'User not found' },
            { status: 401 }
        );
    }

    //check password against hashed password
    if (!verify(password, user.password)) {
        return NextResponse.json(
            { message: 'Invalid password' },
            { status: 401 }
        );
    }

    const jwt_token = await get_jwt_token(
        (user._id as ObjectId)?.toString(),
        user.username,
        user.is_admin
    );

    const res = NextResponse.json(
        {
            message: 'Log in successful',
            jwt_token: jwt_token,
            user: {
                id: user._id?.toString(),
                username: username,
            },
        },
        {
            status: 200,
        }
    );

    set_user_cookie(res, jwt_token);

    return res;
}
