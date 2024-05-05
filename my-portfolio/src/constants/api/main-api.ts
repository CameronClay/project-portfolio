import { FormInputProps, ParamLocation } from '@src/components/form';
import { AUser } from '@src/lib/database/c_users';

export type TestResponse = {
    message: string,
};
export const TEST_PARAMS = [] as FormInputProps[];

export type TestPrivResponse = {
    message: string,
}
export const TEST_PRIV_PARAMS = [] as FormInputProps[];

export type RegisterUserResponse = {
    // user: {
    //     id: string,
    //     username: string,
    // },
    user: AUser,
    message: string,
};
export const REGISTER_USER_PARAMS = [
    {
        name: 'username',
        type: 'string',
        required: true,
        input_id: 'username',
        location: ParamLocation.BODY,
    },
    {
        name: 'password',
        type: 'string',
        required: true,
        input_id: 'password',
        input_type: 'password',
        location: ParamLocation.BODY,
    },
] as FormInputProps[];


export type LoginUserResponse = {
    // user: {
    //     id: string,
    //     username: string,
    // },
    user: AUser,
    jwt_token: string,
    message: string,
};
export const LOGIN_USER_PARAMS = [
    {
        name: 'username',
        type: 'string',
        required: true,
        input_id: 'username',
        location: ParamLocation.BODY,
    },
    {
        name: 'password',
        type: 'string',
        required: true,
        input_id: 'password',
        input_type: 'password',
        location: ParamLocation.BODY,
    },
] as FormInputProps[];


export type LogoutUserResponse = {
    // user: {
    //     id: string,
    //     username: string,
    // },
    user: AUser,
    message: string,
}
export const LOGOUT_USER_PARAMS = [] as FormInputProps[];

export type UpdateUserResponse = {
    message: string,
};
export const UPDATE_USER_PARAMS = [
    {
        name: 'password',
        type: 'string',
        required: true,
        input_id: 'password',
        input_type: 'password',
        location: ParamLocation.BODY,
    },
    {
        name: 'new_username',
        type: 'string',
        required: false,
        input_id: 'new_username',
        location: ParamLocation.BODY,
    },
    {
        name: 'new_password',
        type: 'string',
        required: false,
        input_id: 'new_password',
        input_type: 'password',
        location: ParamLocation.BODY,
    },
] as FormInputProps[];


export type DeleteUserResponse = {
    message: string,
};
export const DELETE_USER_PARAMS = [
    {
        name: 'password',
        type: 'string',
        required: true,
        input_id: 'password',
        input_type: 'password',
        location: ParamLocation.BODY,
    },
] as FormInputProps[];