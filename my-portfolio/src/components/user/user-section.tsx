import React from 'react';
import APIEndpointContextProvider from '@src/context/api/api-endpoint-context';
import { UserFormResponse } from '@src/components/user/user-form';

export type UserSectionProps = {
    header_text : string,
    user_form   : React.ReactNode
}

export default function UserSection({ user_form, header_text }: UserSectionProps) {
    return (
        <APIEndpointContextProvider>
            <div className='flex items-center justify-center fixed top-[4rem] left-0 right-0 bottom-0 pageContainerColor'>
                <div className='m-[0.5rem] p-[0.5rem] dark:bg-gray-900 bg-gray-300 borderBlack'>
                    <h3 className='text-2xl mb-[0.25rem]'>{header_text}</h3>
                    <hr className='mb-[0.75rem]'/>

                    {user_form}
              
                    <UserFormResponse/>
                </div>
            </div>
        </APIEndpointContextProvider>
    )
}
