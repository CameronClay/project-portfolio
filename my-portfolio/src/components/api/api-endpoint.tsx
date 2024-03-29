import React from 'react';
import clsx from 'clsx'; //clsxx helps with conditionally applying classes
import TestBtn from '@src/components/test-btn';

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
    method: RESTMethodType,
    endpoint: string,
    description: string,
    paramaters: APIParamater[],
}

export default function APIEndpoint({ method, endpoint, description, paramaters }: APIEndpointParams) {
    return (
        <div className='flex flex-col justify-start m-[0.5rem] border-[0.125rem] p-[0.5rem] borderBlack100'>
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
        
                                <input 
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
        </div>
    )
}