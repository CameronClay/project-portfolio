'use client';

import React from 'react';
import APIEndpointFormEtc from '@src/components/api/api-endpoint/endpoint-form-etc';
import * as api_tmain from '@src/lib/api/main';
import * as params from '@src/constants/api/public-api-params';

//cannot pass function from server to client component so have to have the function part of the component

export function FormTest() {
    return (
        <APIEndpointFormEtc
            btn_text="Test"
            parameters={params.test}
            get_response={async (forminfo: Record<string, string>) => {
                return await api_tmain.get_test_endpoint();
            }}
        />
    );
}

export function FormTestPriv() {
    return (
        <APIEndpointFormEtc
            btn_text="Test"
            parameters={params.test_priv}
            get_response={async (forminfo: Record<string, string>) => {
                return await api_tmain.get_test_endpoint_priv();
            }}
        />
    );
}

export function FormRegisterUser() {
    return (
        <APIEndpointFormEtc
            btn_text="Register"
            parameters={params.register_user}
            get_response={async (forminfo: Record<string, string>) => {
                return await api_tmain.register(
                    forminfo.username,
                    forminfo.password
                );
            }}
        />
    );
}

export function FormLoginUser() {
    return (
        <APIEndpointFormEtc
            btn_text="Login"
            parameters={params.login_user}
            get_response={async (forminfo: Record<string, string>) => {
                return await api_tmain.login(
                    forminfo.username,
                    forminfo.password
                );
            }}
        />
    );
}

export function FormLogoutUser() {
    return (
        <APIEndpointFormEtc
            btn_text="Logout"
            parameters={params.logout_user}
            get_response={async (forminfo: Record<string, string>) => {
                return await api_tmain.logout();
            }}
        />
    );
}

export function FormUpdateUser() {
    return (
        <APIEndpointFormEtc
            btn_text="Update"
            parameters={params.update_user}
            get_response={async (forminfo: Record<string, string>) => {
                return await api_tmain.update_user(
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
            btn_text="Delete"
            parameters={params.delete_user}
            get_response={async (forminfo: Record<string, string>) => {
                return await api_tmain.delete_user(forminfo.password);
            }}
        />
    );
}
