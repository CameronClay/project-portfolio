import { FormInputProps } from "@src/components/form";

export const get_users = [] as FormInputProps[];

export const get_user = [ 
    {
        name: 'user_id',
        type: 'string',
        required: true,
        input_id: 'user_id'
    }
] as FormInputProps[];

export const update_user = [
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
] as FormInputProps[];

export const delete_user = [
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
] as FormInputProps[];

export const get_stat = [ 
    {
        name: 'entry_id',
        type: 'string',
        required: true,
        input_id: 'entry_id'
    }
];

export const get_stats = [] as FormInputProps[];

export const clear_stats = [] as FormInputProps[];