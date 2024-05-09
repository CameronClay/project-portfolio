import { FormInputProps, ParamLocation } from '@src/components/form';

export const REGISTER_USER_PAGE_PARAMS = [
    {
        name: 'Username',
        type: 'string',
        required: true,
        input_id: 'username',
        location: ParamLocation.BODY,
    },
    {
        name: 'Password',
        type: 'string',
        required: true,
        input_id: 'password',
        input_type: 'password',
        location: ParamLocation.BODY,
    },
    {
        name: 'Repeat password',
        type: 'string',
        required: true,
        input_id: 'password_repeat',
        input_type: 'password',
        location: ParamLocation.BODY,
    },
] as FormInputProps[];

export const LOGIN_USER_PAGE_PARAMS = [
    {
        name: 'Username',
        type: 'string',
        required: true,
        input_id: 'username',
        location: ParamLocation.BODY,
    },
    {
        name: 'Password',
        type: 'string',
        required: true,
        input_id: 'password',
        input_type: 'password',
        location: ParamLocation.BODY,
    },
] as FormInputProps[];