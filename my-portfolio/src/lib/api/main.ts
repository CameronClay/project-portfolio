import { on_request_error } from '@src/lib/api/helpers';
import { PROD_URL } from '@src/constants/url-constants';

//register user
export async function register(username: string, password: string) {
    let response: Response | null = null;
    try {
        response = await fetch(PROD_URL + '/api/public/account/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password
            }),
        });
        return response;
    } catch (error) {
        return await on_request_error(response, error);
    }
}

//login user
export async function login(username: string, password: string) {
    let response: Response | null = null;
    try {
        response = await fetch(PROD_URL + '/api/public/account/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password
            }),
        });
        return response;
    } catch (error) {
        return await on_request_error(response, error);
    }
}

//logout user
export async function logout() {
    let response: Response | null = null;
    try {
        response = await fetch(PROD_URL + '/api/private/account/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        return response;
    } catch (error) {
        return await on_request_error(response, error);
    }
}

//delete currently logged in user
export async function delete_user(password: string) {
    let response: Response | null = null;
    try {
        response = await fetch(PROD_URL + '/api/private/account/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                password: password
            }),
        });
        return response;
    } catch (error) {
        return await on_request_error(response, error);
    }
}

//update currently logged in user
export async function update_user(
    password: string,
    new_username: string,
    new_password: string
) {
    let response: Response | null = null;
    try {
        response = await fetch(PROD_URL + '/api/private/account/update', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                password: password,
                new_username: new_username,
                new_password: new_password
            }),
        });
        return response;
    } catch (error) {
        return await on_request_error(response, error);
    }
}

//test endpoint
export async function get_test_endpoint() {
    let response: Response | null = null;
    try {
        response = await fetch(PROD_URL + '/api/public/test-endpoint', {
            method: 'GET',
            headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            },
        });
        return response;
    } catch (error) {
        return await on_request_error(response, error);
    }
}

//test endpoint (with authentication required via middleware)
export async function get_test_endpoint_priv() {
    let response: Response | null = null;
    try {
        response = await fetch(PROD_URL + '/api/private/test-endpoint-priv', {
            method: 'GET',
            headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            },
        });
        return response;
    } catch (error) {
        return await on_request_error(response, error);
    }
}
