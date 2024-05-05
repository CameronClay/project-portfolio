export function get_cookies(request: Request) {
    const cookie_header = request.headers.get('cookie');

    if (cookie_header) {
        const cookies: { [key: string]: string } = cookie_header
            .split(';')
            .map((cookie) => cookie.trim().split('='))
            .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

        return cookies;
    }

    return null;
}

//Expires the user jwt token cookie (note the JWT token is still valid, this only expires the cookie)
//path is the path the cookie will be sent on follow up requests from the client e.g. /api/private
export function expire_cookie_str(name: string, path: string = '/') {
    return `${name}=; Path=${path}; Max-Age=0`;
}