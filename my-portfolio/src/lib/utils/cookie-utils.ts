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
