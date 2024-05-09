import * as users_db from '@src/lib/database/c_users';
import { parse_params_resp, Param } from '@src/lib/api/helpers';
import * as api_info from '@src/constants/api/main-api';
import { GenericResponse } from '@src/constants/api/generic';
import { AUser } from '@src/lib/database/c_users';

export async function POST(request: Request) {
    const { data, response } = await parse_params_resp(
        request,
        api_info.REGISTER_USER_PARAMS as Param[]
    );
    if (response !== null) {
        return response;
    }

    const username = data['username'] as string;
    const password = data['password'] as string;

    const user = await users_db.get_user_by_username(username);

    if (user != null) {
        return Response.json(
            { message: 'Username already exists' } as GenericResponse,
            { status: 401 }
        );
    }

    const result = await users_db.create_user(username, password);

    return Response.json(
        {
            user: {
                username: username,
                is_admin: false,
                _id: result.insertedId.toString(),
            } as AUser,
            message: 'Registration successful',
        } as api_info.RegisterUserResponse,
        {
            status: 200,
        }
    );
}