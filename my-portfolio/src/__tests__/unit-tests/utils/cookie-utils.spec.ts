import { get_cookies, expire_cookie_str } from '@src/lib/utils/cookie-utils';

describe('cookie utilities', () => {
    it('get_cookies works correctly without cookies', () => {
        const request = new Request('http://localhost:3000');
        const cookies = get_cookies(request);
        expect(cookies).toBeNull();
    });

    it('get_cookies works correctly with cookies', () => {
        const request = new Request('http://localhost:3000');
        request.headers.set('cookie', 'key1=value1; key2=value2');

        const cookies = get_cookies(request);
        expect(cookies).not.toBeNull();
        expect(cookies).toEqual({ 'key1': 'value1', 'key2': 'value2' });
    });

    it('expire_cookie_str works correctly', () => {
        const cookie_str = expire_cookie_str('key', '/');
        expect(cookie_str).toBe('key=; Path=/; Max-Age=0');
    });
});