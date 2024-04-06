import React from 'react';
// import clsx from 'clsx';
// import APIEndpointFormEtc from '@src/components/api/api-endpoint/endpoint-form-etc';
// import { FormInputProps } from '@src/components/form';
import { RESTMethodType } from '@src/constants/api/constants';
import APIEndpointResponse from '@src/components/api/api-endpoint/endpoint-response';

export type APIEndpointParams = {
    method: RESTMethodType,
    endpoint: string,
    description: string,
    auth_required?: boolean
    form: React.ReactNode
}

export default function APIEndpointBase({ method, endpoint, description, auth_required, form }: APIEndpointParams) {
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
                {description} {auth_required !== null ? <span className='font-bold'> (Authentication Required)</span> : ''}
            </p>

            <hr className='mt-[0.5rem] mb-[1rem] h-[0.125rem] bg-black dark:bg-white'/>

            {form}        

            {/* <APIEndpointFormEtc
                endpoint={endpoint}
                btn_text={btn_text}
                parameters={parameters}
                get_response={get_response}            
            /> */}

            <APIEndpointResponse/>
        </div>
    )
}