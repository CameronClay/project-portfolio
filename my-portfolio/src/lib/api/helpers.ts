import { get_error_message } from "@src/lib/utils/validation";
import { log_ext } from '@src/lib/utils/log-utils';

//return error response if request fails for any reason
export async function on_request_error(response : Response | null, error : unknown) {
    await log_ext(`${on_request_error.name} ${error}`);

    let status_code = (response !== null && response.status !== null) ? response.status : 500;
    response = Response.json({ error: get_error_message(error) }, { status: status_code });
    return response;
}