'use client';

import React from 'react';
import APIEndpointFormEtc from '@src/components/api/api-endpoint/endpoint-form-etc';
import * as api_tadmin from '@src/lib/api/test-admin';

//cannot pass function from server to client component so have to have the function part of the component

export function FormGetUsers() {
    return (
        <APIEndpointFormEtc
            btn_text='Get Users'
            parameters={[]}
            get_response={
                async (forminfo : any) => {
                    return await api_tadmin.get_users();
                }
            }
        />
    )
}

export function FormGetUser() {
    return (
        <APIEndpointFormEtc
            btn_text='Get User'
            parameters={[ 
                {
                    name: 'user_id',
                    type: 'string',
                    required: true,
                    input_id: 'user_id'
                }
            ]}
            get_response={
                async (forminfo : any) => {
                    return await api_tadmin.get_user_by_id(forminfo.user_id);
                }
            }
        />
    )
}

export function FormUpdateUser() {
    return (
        <APIEndpointFormEtc
            btn_text='Update User'
            parameters={[
                {
                    name: 'username',
                    type: 'string',
                    required: true,
                    input_id: 'username'
                },
                {
                    name: 'password',
                    type: 'string',
                    required: true,
                    input_id: 'password',
                    input_type: 'password'
                },
                {
                    name: 'new_username',
                    type: 'string',
                    required: false,
                    input_id: 'new_username'
                },
                {
                    name: 'new_password',
                    type: 'string',
                    required: false,
                    input_id: 'new_password',
                    input_type: 'password'
                }
            ]}
            get_response={
                async (forminfo : any) => {
                    return await api_tadmin.update_user_by_username(forminfo.username, forminfo.password, forminfo.new_username, forminfo.new_password);
                }
            }
        />
    )
}

export function FormDeleteUser() {
    return (
        <APIEndpointFormEtc
            btn_text='Delete User'
            parameters={[
                {
                    name: 'username',
                    type: 'string',
                    required: true,
                    input_id: 'username'
                },
                {
                    name: 'password',
                    type: 'string',
                    required: true,
                    input_id: 'password',
                    input_type: 'password'
                }
            ]}
            get_response={
                async (forminfo : any) => {
                    return await api_tadmin.delete_user_by_username(forminfo.username, forminfo.password, forminfo.new_username, forminfo.new_password);
                }
            }
        />
    )
}

export function FormGetStat() {
    return (
        <APIEndpointFormEtc
            btn_text='Get Stat'
            parameters={[ 
                {
                    name: 'entry_id',
                    type: 'string',
                    required: true,
                    input_id: 'entry_id'
                }
            ]}
            get_response={
                async (forminfo : any) => {
                    return await api_tadmin.get_stat(forminfo.entry_id);
                }
            }
        />
    )
}

export function FormGetStats() {
    return (
        <APIEndpointFormEtc
            btn_text='Get Stats'
            parameters={[]}
            get_response={
                async (forminfo : any) => {
                    return await api_tadmin.get_stats();
                }
            }
        />
    )
}

export function FormClearStats() {
    return (
        <APIEndpointFormEtc
            btn_text='Clear Stats'
            parameters={[]}
            get_response={
                async (forminfo : any) => {
                    return await api_tadmin.clear_stats();
                }
            }
        />
    )
}


