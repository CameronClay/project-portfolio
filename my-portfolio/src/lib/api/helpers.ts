import { get_error_message } from '@src/lib/utils/validation';
import { log_ext } from '@src/lib/utils/log-utils';
import { NextRequest, NextResponse } from 'next/server';
import { ParamLocation } from '@src/components/form';

//return error response if request fails for any reason
export async function on_request_error(
    response: Response | null,
    error: unknown
) {
    await log_ext(`${on_request_error.name} ${get_error_message(error)}`);

    const status_code =
        response !== null && response.status !== null ? response.status : 500;
    response = Response.json(
        { error: get_error_message(error) },
        { status: status_code }
    );
    return response;
}

export type Param = {
    name: string;
    type: string;
    required: boolean;
    location: ParamLocation;
};

//verifies all parameters are present in the request and of the correct type and in the correct location (query/body)
//returns Error exception if any parameter fails to meet criteria
export async function parse_params(
    request: NextRequest,
    param_info: Param[]
): Promise<Record<string, unknown>> {
    let data: Record<string, unknown> | null = null;
    //param_info.forEach(async (param: Param) => {
    //cannot use forEach because of async
    //cannot use Promise.all because it runs the function in parallel and this code is not safe to run in parallel
    for (const param of param_info) {
        let param_value: unknown = null;
        if (param.location == ParamLocation.BODY) {
            if (data == null) {
                data = (await request.json()) as Record<string, unknown>;
            }

            param_value = data[param.name];
        } else if (param.location == ParamLocation.QUERY) {
            if (data == null) {
                data = {};
            }

            param_value = request.nextUrl.searchParams.get(param.name);

            // const url = new URL(request.url);
            // if (url.searchParams.get("user_id") == null) {
            //     return NextResponse.json({ message: "Expected user_id" }, { status: 422 });
            // }
        } else {
            throw new Error('Invalid ParamLocation');
        }

        // const param_value = data[param.name];
        if (param_value == null && param.required) {
            throw new Error('Missing parameter ' + param.name);
        }
        if (typeof param_value != param.type) {
            throw new Error(
                'Invalid type for ' +
                    param.name +
                    ' (expected ' +
                    param.type +
                    ')'
            );
        }
        data[param.name] = param_value;
    }

    if (data == null) {
        data = {};
    }

    return data;
}

//wraps parse_params and returns response from error if parse fails
export async function parse_params_resp(
    request: NextRequest,
    param_info: Param[]
): Promise<{ data: Record<string, unknown>; response: NextResponse | null }> {
    let data: Record<string, unknown> = {};
    let response: NextResponse | null = null;
    try {
        data = await parse_params(request, param_info);
    } catch (error) {
        response = NextResponse.json({ message: error }, { status: 422 });
    }

    return { data, response };
}
