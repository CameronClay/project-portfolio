import { getErrorMessage } from '@src/lib/utils/validation';

function on_request_error(response : Response | null, error : unknown) {
    console.log(`${get_users.name} ${error}`);

    let status_code = (response !== null && response.status !== null) ? response.status : 500;
    response = Response.json({ error: getErrorMessage(error) }, { status: status_code });
    return response;
}

export async function register(username: string, password: string) {
    let response : Response | null = null;
    try {
        response = await fetch(
          "http://localhost:3000/api/public/register",
          {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
                'username': username,
                'password': password
            }),
          }
        );
        return response;
    } 
    catch (error) {
        return on_request_error(response, error);
    }
}

export async function login(username: string, password: string) {
    let response : Response | null = null;
    try {
        response = await fetch(
            "http://localhost:3000/api/public/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ 
                    username: username,
                    password: password
                }),
            }
        );
        return response;
    } 
    catch (error) {
        return on_request_error(response, error);
    }
}

export async function delete_user_by_username(username: string, password: string) {
    let response : Response | null = null;
    try {
        response = await fetch(
            "http://localhost:3000/api/private/user",
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ 
                    username: username,
                    password: password
                }),
            }
        );
        return response;
    } 
    catch (error) {
        return on_request_error(response, error);
    }
}

export async function update_user(username: string, password: string, new_username : string, new_password : string) {
    let response : Response | null = null;
    try {
        response = await fetch(
            "http://localhost:3000/api/private/user",
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ 
                    username: username,
                    password: password,
                    new_username: new_username,
                    new_password: new_password
                }),
            }
        );
        return response;
    } 
    catch (error) {
        return on_request_error(response, error);
    }
}


export async function get_user(user_id : string) {
    let response : Response | null = null;
    try {
        response = await fetch(
            "http://localhost:3000/api/private/user?" + new URLSearchParams({
                user_id: user_id
            }),
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        return response;
    } 
    catch (error) {
        return on_request_error(response, error);
    }
}

export async function get_users() {
    let response : Response | null = null;
    try {
        response = await fetch(
            "http://localhost:3000/api/private/users",
            {
                method: "GET",
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json",
                },
            }
        );
        return response;
    } 
    catch (error) {
        return on_request_error(response, error);
    }
}

export async function create_stat(date: number, ip: string) {
    let response : Response | null = null;
    try {
        response = await fetch(
          "http://localhost:3000/api/middleware/stat",
          {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
                'date': date,
                'ip': ip
            }),
          }
        );
        return response;
    } 
    catch (error) {
        return on_request_error(response, error);
    }
}


export async function get_stat(entry_id : string) {
    let response : Response | null = null;
    try {
        response = await fetch(
            "http://localhost:3000/api/private/stat?"+ new URLSearchParams({
                entry_id: entry_id
            }),
            {
                method: "GET",
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json",
                },
            }
        );
        return response;
    } 
    catch (error) {
        return on_request_error(response, error);
    }
}

export async function get_stats() {
    let response : Response | null = null;
    try {
        response = await fetch(
            "http://localhost:3000/api/private/stats",
            {
                method: "GET",
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json",
                },
            }
        );
        return response;
    } 
    catch (error) {
        return on_request_error(response, error);
    }
}

export async function clear_stats() {
    let response : Response | null = null;
    try {
        response = await fetch(
            "http://localhost:3000/api/private/stats",
            {
                method: "DELETE",
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json",
                },
            }
        );
        return response;
    } 
    catch (error) {
        return on_request_error(response, error);
    }
}

export async function get_test_endpoint() {
    let response : Response | null = null;
    try {
        response = await fetch(
            "http://localhost:3000/api/public/test-endpoint",
            {
                method: "GET",
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json",
                },
            }
        );
        return response;
    } 
    catch (error) {
        return on_request_error(response, error);
    }
}

export async function get_test_endpoint_priv() {
    let response : Response | null = null;
    try {
        response = await fetch(
            "http://localhost:3000/api/private/test-endpoint-priv",
            {
                method: "GET",
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json",
                },
            }
        );
        return response;
    } 
    catch (error) {
        return on_request_error(response, error);
    }
}