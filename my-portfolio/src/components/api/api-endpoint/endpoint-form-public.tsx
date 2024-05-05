'use client';

import React from 'react';
import APIEndpointFormEtc from '@src/components/api/api-endpoint/endpoint-form-etc';
import * as api_tmain from '@src/lib/api/main';
import * as api_info from '@src/constants/api/main-api';

//cannot pass function from server to client component so have to have the function part of the component

export function FormTest() {
    return (
        <APIEndpointFormEtc
            btn_text="Test"
            parameters={api_info.TEST_PARAMS}
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
            parameters={api_info.TEST_PRIV_PARAMS}
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
            parameters={api_info.REGISTER_USER_PARAMS}
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
            parameters={api_info.LOGIN_USER_PARAMS}
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
            parameters={api_info.LOGOUT_USER_PARAMS}
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
            parameters={api_info.UPDATE_USER_PARAMS}
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
            parameters={api_info.DELETE_USER_PARAMS}
            get_response={async (forminfo: Record<string, string>) => {
                return await api_tmain.delete_user(forminfo.password);
            }}
        />
    );
}
