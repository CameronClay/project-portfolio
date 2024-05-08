import React, { Suspense } from 'react';
import ResponseTextContextProvider from '@src/context/response-text-context';
import { UserFormResponse } from '@src//components/user/components/user-form';

export type UserSectionProps = {
    header_text: string;
    user_form: React.ReactNode;
};

//wraps a user_form and displays it as the whole page (separate component because user_form is a client component)
export default function UserSection({
    user_form,
    header_text,
}: UserSectionProps) {
    return (
        <ResponseTextContextProvider>
            <div className="flex items-center justify-center top-[4rem] pageContainerColor h-[calc(100vh-10rem)] w-full">
                <div className="m-[0.5rem] p-[0.5rem] dark:bg-gray-900 bg-gray-300 borderBlack">
                    <h3 className="text-2xl mb-[0.25rem]">{header_text}</h3>
                    <hr className="mb-[0.75rem]" />

                    {
                        //Suspense lets you display a fallback component until the child component is fully loaded. Also needed to avoid useSearchParams error that occurs without suspense boundary.
                    }
                    <Suspense>{user_form}</Suspense>

                    <UserFormResponse />
                </div>
            </div>
        </ResponseTextContextProvider>
    );
}
