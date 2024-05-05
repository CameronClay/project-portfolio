export function get_headers(headers: Headers) {
    return Object.fromEntries(headers.entries());
    // let obj: Record<string, string> = {};
    // for (let [k, v] of headers) obj[k] = v;
    // return obj;
}

export function headers_to_string(headers: Headers) {
    return JSON.stringify(get_headers(headers));
}

export async function response_to_string(response: Response) {
    /* eslint-disable-next-line prefer-const */
    let obj: Record<string, unknown> = {};
    obj.status = response.status;
    obj.headers = get_headers(response.headers);
    obj.body = await response.json();

    return JSON.stringify(obj);
}