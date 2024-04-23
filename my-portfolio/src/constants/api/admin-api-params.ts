import { FormInputProps, ParamLocation } from '@src/components/form';

export const get_users = [] as FormInputProps[];

export const get_user = [
    {
        name: 'user_id',
        type: 'string',
        required: true,
        input_id: 'user_id',
        location: ParamLocation.QUERY,
    },
] as FormInputProps[];

export const update_user = [
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

export const delete_user = [
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

export const get_stat = [
    {
        name: 'entry_id',
        type: 'string',
        required: true,
        input_id: 'entry_id',
        location: ParamLocation.QUERY,
    },
];

export const get_stats = [] as FormInputProps[];

export const clear_stats = [] as FormInputProps[];
