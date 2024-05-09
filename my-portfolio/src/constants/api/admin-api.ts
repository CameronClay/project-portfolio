import { FormInputProps, ParamLocation } from '@src/components/form';
import { AStat } from '@src/lib/database/c_stats';
import { AUser } from '@src/lib/database/c_users';

export type GetUsersResponse = {
    users: AUser[],
}
export const GET_USERS_PARAMS = [] as FormInputProps[];

export type GetUserResponse = {
    user: AUser,
}
export const GET_USER_PARAMS = [
    {
        name: 'user_id',
        type: 'string',
        required: true,
        input_id: 'user_id',
        location: ParamLocation.QUERY,
    },
] as FormInputProps[];

export type UpdateUserResponse = {
    message: string,
}
export const UPDATE_USER_PARAMS = [
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

export type DeleteUserResponse = {
    message: string,
}
export const DELETE_USER_PARAMS = [
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

export type GetStatResponse = {
    stat: AStat,
}
export const GET_STAT_PARAMS = [
    {
        name: 'entry_id',
        type: 'string',
        required: true,
        input_id: 'entry_id',
        location: ParamLocation.QUERY,
    },
] as FormInputProps[];

export type GetStatsResponse = {
    stats: AStat[],
}
export const GET_STATS_PARAMS = [] as FormInputProps[];

export type ClearStatsResponse = {
    message: string,
}
export const CLEAR_STATS_PARAMS = [] as FormInputProps[];