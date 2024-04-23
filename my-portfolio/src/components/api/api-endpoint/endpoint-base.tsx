import React from 'react';
// import clsx from 'clsx';
// import APIEndpointFormEtc from '@src/components/api/api-endpoint/endpoint-form-etc';
// import { FormInputProps } from '@src/components/form';
import { RESTMethodType } from '@src/constants/api/constants';
import APIEndpointResponse from '@src/components/api/api-endpoint/endpoint-response';
import Link from 'next/link';
import EndpointLinks from '@src/components/api/api-endpoint/endpoint-links';

export type APIEndpointParams = {
    method: RESTMethodType;
    endpoint: string;
    description: string;
    auth_required?: boolean;
    form: React.ReactNode;
};

export default function APIEndpointBase({
    method,
    endpoint,
    description,
    auth_required,
    form,
}: APIEndpointParams) {
    return (
        <div className="">
            <div className="flex flex-row justify-start flex-wrap">
                <p className="text-2xl text-red-500 font-bold">{method}</p>
                {
                    //basis-full forces the button onto a new line
                }
                <p className="flex ml-[0rem] basis-full sm:basis-0 sm:ml-auto text-2xl sm:whitespace-nowrap">
                    {endpoint}
                </p>
            </div>

            <p>
                {description}{' '}
                {auth_required !== null && auth_required === true ? (
                    <span className="font-bold">
                        {' '}
                        (Authentication Required)
                    </span>
                ) : (
                    ''
                )}
            </p>

            <hr className="mt-[0.5rem] mb-[1rem] h-[0.125rem] bg-black dark:bg-white" />

            {form}

            {auth_required !== null && auth_required === true ? (
                <div>
                    <hr />
                    <EndpointLinks />
                </div>
            ) : null}

            {/* <APIEndpointFormEtc
                endpoint={endpoint}
                btn_text={btn_text}
                parameters={parameters}
                get_response={get_response}            
            /> */}

            <APIEndpointResponse />
        </div>
    );
}
