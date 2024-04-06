import { get_error_message } from "@src/lib/utils/validation";

//return error response if request fails for any reason
export function on_request_error(response : Response | null, error : unknown) {
    console.log(`${on_request_error.name} ${error}`);

    let status_code = (response !== null && response.status !== null) ? response.status : 500;
    response = Response.json({ error: get_error_message(error) }, { status: status_code });
    return response;
}