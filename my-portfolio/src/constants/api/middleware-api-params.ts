import { FormInputProps } from "@src/components/form";

export const create_stat = [ 
    {
        name: 'date',
        type: 'number',
        required: true,
        input_id: 'date'
    },
    {
        name: 'ip',
        type: 'string',
        required: true,
        input_id: 'ip'
    }
] as FormInputProps[];