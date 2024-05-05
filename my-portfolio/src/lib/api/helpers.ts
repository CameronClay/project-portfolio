import { get_error_message } from '@src/lib/utils/validation';
import { log_ext } from '@src/lib/utils/log-utils';
import { ParamLocation } from '@src/components/form';
import { GenericResponse } from '@src/constants/api/generic';

//return error response if request fails for any reason
//utilizes response.status if response is not null
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
    request: Request,
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

            const url = new URL(request.url);
            param_value = url.searchParams.get(param.name);
        } else {
            throw new Error('Invalid ParamLocation');
        }

        if (param.required) {
            if (param_value === null || param_value === undefined) {
                throw new Error('Missing parameter ' + param.name);
            }

            if (typeof param_value != param.type) {
                throw new Error(
                    'Invalid type for ' +
                    param.name +
                    ' (expected ' +
                    param.type +
                    ')' +
                    ' (got ' +
                    typeof param_value +
                    ')'
                );
            }
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
    request: Request,
    param_info: Param[]
): Promise<{ data: Record<string, unknown>; response: Response | null }> {
    let data: Record<string, unknown> = {};
    let response: Response | null = null;
    try {
        data = await parse_params(request, param_info);
    } catch (error) {
        // console.log(error);
        response = Response.json({ message: get_error_message(error) } as GenericResponse, { status: 422 });
    }

    return { data, response };
}