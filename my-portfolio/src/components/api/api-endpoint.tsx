'use client';

import React, { FormEvent, useState } from 'react';
import APIEndpointBase, { RESTMethodType, APIParamater } from '@src/components/api/api-endpoint-base';
import APIEndpointContextProvider, { useResponseTextContext } from '@src/context/api-endpoint-context';

export type APIEndpointParams = {
    method: RESTMethodType,
    endpoint: string,
    description: string,
    paramaters: APIParamater[],
    get_response: (formInfo : object) => Promise<Response>
}

export default function APIEndpoint({ method, endpoint, description, paramaters, get_response }: APIEndpointParams) { 
    return (
        <APIEndpointContextProvider>
            <div className='flex flex-col justify-start m-[0.5rem] border-[0.125rem] p-[0.5rem] borderBlack100'>
                <APIEndpointBase
                    method={method}
                    endpoint={endpoint}
                    description={description}
                    paramaters={paramaters}
                    get_response={get_response}
                >

                </APIEndpointBase>
            </div>
        </APIEndpointContextProvider>
    )
}