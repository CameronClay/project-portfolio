import React from 'react';
import { FormInputProps } from '@src/components/form';
import APIEndpointBase from '@src/components/api/api-endpoint/endpoint-base';
import APIEndpointContextProvider from '@src/context/api-endpoint-context';
import { RESTMethodType } from '@src/constants/api/constants';

export type APIEndpointParams = {
    method: RESTMethodType,
    endpoint: string,
    description: string,
    auth_required?: boolean,
    form: React.ReactNode
}

export default function APIEndpoint({ method, endpoint, description, auth_required, form }: APIEndpointParams) { 
    // const componentType = typeof window === 'undefined' ? 'server' : 'client';
    // console.log(componentType);
    
    return (
        <APIEndpointContextProvider>
            <div className='flex flex-col justify-start m-[0.5rem] border-[0.125rem] p-[0.5rem] borderBlack100'>
                <APIEndpointBase
                    method={method}
                    endpoint={endpoint}
                    description={description}
                    auth_required={auth_required}
                    form={form}
                >

                </APIEndpointBase>
            </div>
        </APIEndpointContextProvider>
    )
}