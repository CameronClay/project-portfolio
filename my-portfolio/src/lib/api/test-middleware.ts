import { on_request_error } from '@src/lib/api/helpers';
import { PROD_URL } from '@src/constants/url-constants';

//create stat (only accessible via server)
//could have used a server action since it is the same way but wanted to do it the hard way for learning purposes
export async function create_stat(date: number, ip: string) {
    let response: Response | null = null;
    try {
        response = await fetch(PROD_URL + '/api/middleware/stat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                date: date,
                ip: ip,
            }),
        });
        return response;
    } catch (error) {
        return await on_request_error(response, error);
    }
}
