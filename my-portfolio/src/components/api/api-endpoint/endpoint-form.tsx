'use client';

import React from 'react';
import { useResponseTextContext } from '@src/context/api-endpoint-context';
import Form, { FormInputProps } from '@src/components/form';
import clsx from 'clsx';

export type APIEndpointFormProps = {
    btn_text: string,
    parameters: FormInputProps[],
    get_response: (forminfo : any) => Promise<Response>,
}

export default function APIEndpointForm({ btn_text, parameters, get_response }: APIEndpointFormProps) {
    const { set_response_text } = useResponseTextContext();

    const on_submit = async (forminfo : any) => {
        const response = await get_response(forminfo);
        const data = response.headers.get('content-type') == 'application/json' ? await response.json() : await response.text();

        set_response_text(JSON.stringify({
            status: response.status,
            data  : data
        }, null, 4));
    };
    
    return (
        <div>
            <p 
                className={clsx('mb-[1rem]',
                    {
                        'hidden': parameters.length == 0
                    }
                )}
            >
                Parameters (<span className='font-bold'>*</span> Indicates required):
            </p>

            <Form
                btn_text={btn_text}
                form_inputs={parameters}
                handle_submit={on_submit}
                refresh_on_submit={false}
            />
        </div>
    )
}
