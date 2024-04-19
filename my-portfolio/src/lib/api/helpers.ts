import { get_error_message } from "@src/lib/utils/validation";
import { log_ext } from '@src/lib/utils/log-utils';
import { NextRequest, NextResponse } from "next/server";

//return error response if request fails for any reason
export async function on_request_error(response : Response | null, error : unknown) {
    await log_ext(`${on_request_error.name} ${error}`);

    let status_code = (response !== null && response.status !== null) ? response.status : 500;
    response = Response.json({ error: get_error_message(error) }, { status: status_code });
    return response;
}

export type Param = {
    name: string,
    type: string,
    required: boolean
}

export async function parse_params(request : NextRequest, param_info : Param[]) {
    const data = await request.json();
    param_info.forEach((param: Param) => {
        const param_value = data[param.name];
        if(param_value == null && param.required) {
            throw new Error("Missing parameter " + param.name);
        }
        if(typeof(param_value) != param.type) {
            throw new Error("Invalid type for " + param.name + " (expected " + param.type + ")");
        }
    });

    return data;
}

export async function parse_params_resp(request : NextRequest, param_info : Param[]) {
    let data : any = null;
    let response : NextResponse | null = null;
    try {
        data = await parse_params(request, param_info);
    }
    catch (error) {
        response = NextResponse.json({ message: error }, { status: 401 });
    }

    return { data, response };
}