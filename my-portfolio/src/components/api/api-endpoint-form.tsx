'use client';

import React, { FormEvent } from 'react';
import { useResponseTextContext } from '@src/context/api-endpoint-context';
import TestBtn from '@src/components/test-btn';
import { formdata_to_json } from '@src/lib/utils/form-utils';

export type APIParamater = {
    name: string,
    type: string,
    required: boolean,
    inputId: string
}

type APIEndpointFormProps = {
    endpoint: string,
    paramaters: APIParamater[],
    get_response: (formInfo : object) => Promise<Response>
}

export default function APIEndpointForm({ endpoint, paramaters, get_response }: APIEndpointFormProps) {
    const { set_response_text } = useResponseTextContext();

    const on_submit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault(); //prevent page refresh

        // console.log('action'); //this is running but it is client component so log shows in the browser console
        const form_data = new FormData(event.currentTarget);
        const form_json = formdata_to_json(form_data);
        const response = await get_response(form_json);
        const data = response.headers.get('content-type') == 'application/json' ? await response.json() : await response.text();

        set_response_text(JSON.stringify({
            status: response.status,
            // data  : await response.text()
            data  : data
        }, null, 4));
    }
    
    return (
        <form 
            onSubmit={on_submit}
        >
            <div className='flex flex-row items-center'>
                <ul className='flex flex-col justify-start w-full'>
                    {
                        paramaters.map((param: APIParamater) => (
                            <li 
                                className='flex flexrow flex-wrap' 
                                key={param.inputId}
                            >
                                <p className='mr-[2rem] text-nowrap'>
                                    {param.name}: {param.type} {param.required ? '(*)' : ''}
                                </p>
        
                                {
                                    //form and id here are optional
                                }
                                <input
                                    id={param.inputId}
                                    name={param.inputId}
                                    type='text'
                                    required={param.required}
                                    maxLength={80}
                                    className='h-[1rem] mb-[0.625rem] p-[0.75rem] emailInput group' 
                                />
                            </li>
                        ))
                    }
                </ul>
                
                <div className='flex justify-end w-full pr-[0.25rem]'>
                    <TestBtn/>
                </div>
            </div>
        </form>
    )
}
