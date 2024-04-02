'use client';

import React, { FormEvent } from 'react';
import clsx from 'clsx';
import APIEndpointForm from '@src/components/api/api-endpoint-form';
import { useResponseTextContext } from '@src/context/api-endpoint-context';

export enum RESTMethodType {
    GET    = 'GET',
    POST   = 'POST',
    PUT    = 'PUT',
    PATCH  = 'PATCH',
    DELETE = 'DELETE'
}
export type APIParamater = {
    name: string,
    type: string,
    required: boolean,
    inputId: string
}

export type APIEndpointParams = {
    // form_id: string,
    method: RESTMethodType,
    endpoint: string,
    description: string,
    paramaters: APIParamater[],
    // on_submit: (event: FormEvent<HTMLFormElement>) => void
    // form_action: (formData : FormData) => void
    // get_response: () => string
    get_response: (formInfo : object) => Promise<Response>
}

export default function APIEndpointBase({ method, endpoint, description, paramaters, get_response }: APIEndpointParams) {
    const { response_text } = useResponseTextContext();

    return (
        <div className=''>
            <div className='flex flex-row justify-start'>
                <p className='text-2xl text-red-500 font-bold'>
                    {method}
                </p>
                <p className='flex justify-end w-full text-2xl'>
                    {endpoint}
                </p>
            </div>

            <p>
                {description}
            </p>

            <hr className='mt-[0.5rem] mb-[1rem] h-[0.125rem] bg-black dark:bg-white'/>

            <p 
                className={clsx('mb-[1rem]',
                    {
                        'hidden': paramaters.length == 0
                    }
                )}
            >
                Parameters (<span className='font-bold'>*</span> Indicates required):
            </p>

            <APIEndpointForm
                endpoint={endpoint}
                paramaters={paramaters}
                get_response={get_response}            
            >

            </APIEndpointForm>


            {
                //undefined and null are the same in typescript
                (response_text !== undefined) && (response_text.length > 0) ? (
                    <div className='flex flex-col justify-start'>
                        <p>
                            Response:
                        </p>
                        <p className='borderBlack100'>
                            {response_text}
                        </p>
                    </div>
                ) : null
            }   
        </div>
    )
}