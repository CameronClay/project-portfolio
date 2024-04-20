import { on_request_error } from '@src/lib/api/helpers';
import { PROD_URL } from "@src/constants/url-constants";

//all endpoints require authentication as admin

//delete user by username
export async function delete_user_by_username(username: string, password: string) {
    let response : Response | null = null;
    try {
        response = await fetch(
            PROD_URL + "/api/private/admin/user",
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
        return await on_request_error(response, error);
    }
}

//update user by username
export async function update_user_by_username(username: string, password: string, new_username : string, new_password : string) {
    let response : Response | null = null;
    try {
        response = await fetch(
            PROD_URL + "/api/private/admin/user",
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
        return await on_request_error(response, error);
    }
}

//get user by id
export async function get_user_by_id(user_id : string) {
    let response : Response | null = null;
    try {
        response = await fetch(
            PROD_URL + "/api/private/admin/user?" + new URLSearchParams({
                user_id: user_id
            }).toString(),
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
        return await on_request_error(response, error);
    }
}

//get all users
export async function get_users() {
    let response : Response | null = null;
    try {
        response = await fetch(
            PROD_URL + "/api/private/admin/users",
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
        return await on_request_error(response, error);
    }
}

//get stat by entry_id
export async function get_stat(entry_id : string) {
    let response : Response | null = null;
    try {
        response = await fetch(
            PROD_URL + "/api/private/admin/stat?" + new URLSearchParams({
                entry_id: entry_id
            }).toString(),
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
        return await on_request_error(response, error);
    }
}

//get all stats
export async function get_stats() {
    let response : Response | null = null;
    try {
        response = await fetch(
            PROD_URL + "/api/private/admin/stats",
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
        return await on_request_error(response, error);
    }
}

//clear all stats
export async function clear_stats() {
    let response : Response | null = null;
    try {
        response = await fetch(
            PROD_URL + "/api/private/admin/stats",
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
        return await on_request_error(response, error);
    }
}