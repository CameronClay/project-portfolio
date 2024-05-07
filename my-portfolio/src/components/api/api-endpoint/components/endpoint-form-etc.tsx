'use client';

import React from 'react';
import APIEndpointForm, {
    APIEndpointFormProps,
} from '@src/components/api/api-endpoint/components/endpoint-form';
import { FormInputProps } from '@src/components/form';

export default function APIEndpointFormEtc({
    btn_text,
    parameters,
    get_response,
}: APIEndpointFormProps) {
    return (
        <APIEndpointForm
            btn_text={btn_text}
            //react requires creating new objects instead of mutating them
            //...param spreads all the properties of the param object into a new object.
            parameters={parameters.map((param: FormInputProps) => ({
                ...param,
                name: `${param.name}: ${param.type} ${param.required ? '(*)' : ''}`,
            }))}
            get_response={get_response}
        />
    );
}
