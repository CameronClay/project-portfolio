'use client';

import React from 'react';
import APIEndpointFormEtc from '@src/components/api/api-endpoint/components/endpoint-form-etc';
import * as api_tadmin from '@src/lib/api/admin';
import * as api_info from '@src/constants/api/admin-api';

//cannot pass function from server to client component so have to have the function part of the component

export function FormGetUsers() {
    return (
        <APIEndpointFormEtc
            btn_text="Get Users"
            parameters={api_info.GET_USERS_PARAMS}
            get_response={async (forminfo: Record<string, string>) => {
                return await api_tadmin.get_users();
            }}
        />
    );
}

export function FormGetUser() {
    return (
        <APIEndpointFormEtc
            btn_text="Get User"
            parameters={api_info.GET_USER_PARAMS}
            get_response={async (forminfo: Record<string, string>) => {
                return await api_tadmin.get_user_by_id(forminfo.user_id);
            }}
        />
    );
}

export function FormUpdateUser() {
    return (
        <APIEndpointFormEtc
            btn_text="Update User"
            parameters={api_info.UPDATE_USER_PARAMS}
            get_response={async (forminfo: Record<string, string>) => {
                return await api_tadmin.update_user_by_username(
                    forminfo.username,
                    forminfo.password,
                    forminfo.new_username,
                    forminfo.new_password
                );
            }}
        />
    );
}

export function FormDeleteUser() {
    return (
        <APIEndpointFormEtc
            btn_text="Delete User"
            parameters={api_info.DELETE_USER_PARAMS}
            get_response={async (forminfo: Record<string, string>) => {
                return await api_tadmin.delete_user_by_username(
                    forminfo.username,
                    forminfo.password
                );
            }}
        />
    );
}

export function FormGetStat() {
    return (
        <APIEndpointFormEtc
            btn_text="Get Stat"
            parameters={api_info.GET_STAT_PARAMS}
            get_response={async (forminfo: Record<string, string>) => {
                return await api_tadmin.get_stat(forminfo.entry_id);
            }}
        />
    );
}

export function FormGetStats() {
    return (
        <APIEndpointFormEtc
            btn_text="Get Stats"
            parameters={api_info.GET_STATS_PARAMS}
            get_response={async (forminfo: Record<string, string>) => {
                return await api_tadmin.get_stats();
            }}
        />
    );
}

export function FormClearStats() {
    return (
        <APIEndpointFormEtc
            btn_text="Clear Stats"
            parameters={api_info.CLEAR_STATS_PARAMS}
            get_response={async (forminfo) => {
                return await api_tadmin.clear_stats();
            }}
        />
    );
}
