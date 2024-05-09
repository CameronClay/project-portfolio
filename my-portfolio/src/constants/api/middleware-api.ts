import { FormInputProps, ParamLocation } from '@src/components/form';
import { ObjectId } from 'mongodb';

export type CreateStatResponse = {
    _id: ObjectId,
    message: string,
};
export const CREATE_STAT_PARAMS = [
    {
        name: 'date',
        type: 'number',
        required: true,
        input_id: 'date',
        location: ParamLocation.BODY,
    },
    {
        name: 'ip',
        type: 'string',
        required: true,
        input_id: 'ip',
        location: ParamLocation.BODY,
    },
] as FormInputProps[];