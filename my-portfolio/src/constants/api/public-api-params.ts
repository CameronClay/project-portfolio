import { FormInputProps, ParamLocation } from "@src/components/form";

export const test = [] as FormInputProps[];

export const test_priv = [] as FormInputProps[];

export const register_user = [
    {
        name: 'username',
        type: 'string',
        required: true,
        input_id: 'username',
        location: ParamLocation.BODY
    },
    {
        name: 'password',
        type: 'string',
        required: true,
        input_id: 'password',
        input_type: 'password',
        location: ParamLocation.BODY
    }
] as FormInputProps[];

export const login_user = [
    {
        name: 'username',
        type: 'string',
        required: true,
        input_id: 'username',
        location: ParamLocation.BODY
    },
    {
        name: 'password',
        type: 'string',
        required: true,
        input_id: 'password',
        input_type: 'password',
        location: ParamLocation.BODY
    }
] as FormInputProps[];

export const logout_user = [] as FormInputProps[];

export const update_user = [
    {
        name: 'password',
        type: 'string',
        required: true,
        input_id: 'password',
        input_type: 'password',
        location: ParamLocation.BODY
    },
    {
        name: 'new_username',
        type: 'string',
        required: false,
        input_id: 'new_username',
        location: ParamLocation.BODY
    },
    {
        name: 'new_password',
        type: 'string',
        required: false,
        input_id: 'new_password',
        input_type: 'password',
        location: ParamLocation.BODY
    }
] as FormInputProps[];

export const delete_user = [
    {
        name: 'password',
        type: 'string',
        required: true,
        input_id: 'password',
        input_type: 'password',
        location: ParamLocation.BODY
    }
] as FormInputProps[];