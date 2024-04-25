import * as users_db from '@src/lib/database/c_users';
import { generate, Options } from 'password-hash';
import { parse_params_resp, Param } from '@src/lib/api/helpers';
import * as params from '@src/constants/api/public-api-params';

export async function POST(request: Request) {
    const { data, response } = await parse_params_resp(
        request,
        params.register_user as Param[]
    );
    if (response !== null) {
        return response;
    }

    const username = data['username'] as string;
    const password = data['password'] as string;

    const user = await users_db.get_user_by_username(username);

    if (user != null) {
        return Response.json(
            { message: 'Username already exists' },
            { status: 401 }
        );
    }

    const result = await users_db.create_user(username, generate(password));

    return Response.json(
        {
            user: {
                id: result.insertedId.toString(),
                username: username,
            },
            message: 'Registration successful',
        },
        {
            status: 200,
        }
    );
}
