import { FormInputProps, ParamLocation } from "@src/components/form";

export const create_stat = [
    {
        name: 'date',
        type: 'number',
        required: true,
        input_id: 'date',
        location: ParamLocation.BODY
    },
    {
        name: 'ip',
        type: 'string',
        required: true,
        input_id: 'ip',
        location: ParamLocation.BODY
    }
] as FormInputProps[];