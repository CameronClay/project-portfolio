'use client';

import React from 'react';
import APIEndpointFormEtc from '@src/components/api/api-endpoint/endpoint-form-etc';
import * as api_tmain from '@src/lib/api/test-main';

//cannot pass function from server to client component so have to have the function part of the component

export function FormTest() {
    return (
        <APIEndpointFormEtc
            btn_text='Test'
            parameters={[]}
            get_response={
                async (forminfo : any) => {
                    return await api_tmain.get_test_endpoint();
                }
            }
        />
    )
}

export function FormTestPriv() {
    return (
        <APIEndpointFormEtc
            btn_text='Test'
            parameters={[]}
            get_response={
                async (forminfo : any) => {
                    return await api_tmain.get_test_endpoint_priv();
                }
            }
        />
    )
}

export function FormRegisterUser() {
    return (
        <APIEndpointFormEtc
            btn_text='Register'
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
                    return await api_tmain.register(forminfo.username, forminfo.password);
                }
            }
        />
    )
}

export function FormLoginUser() {
    return (
        <APIEndpointFormEtc
            btn_text='Login'
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
                    return await api_tmain.login(forminfo.username, forminfo.password);
                }
            }
        />
    )
}

export function FormLogoutUser() {
    return (
        <APIEndpointFormEtc
            btn_text='Logout'
            parameters={[]}
            get_response={
                async (forminfo : any) => {
                    return await api_tmain.logout();
                }
            }
        />
    )
}

export function FormUpdateUser() {
    return (
        <APIEndpointFormEtc
            btn_text='Update'
            parameters={[
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
                    return await api_tmain.update_user(forminfo.password, forminfo.new_username, forminfo.new_password);
                }
            }
        />
    )
}

export function FormDeleteUser() {
    return (
        <APIEndpointFormEtc
            btn_text='Delete'
            parameters={[
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
                    return await api_tmain.delete_user(forminfo.password);
                }
            }
        />
    )
}