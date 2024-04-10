'use client';

import React from 'react';
import Form from '@src/components/form';
import SubmitBtn from '@src/components/submit-btn';
import APIEndpointContextProvider, { useResponseTextContext } from '@/src/context/api/api-endpoint-context';
import { FormInputProps } from '@src/components/form';

export function UserFormSubmitBtnContainer({children}: {children: React.ReactNode}) {
    return (
        //w-0 basis-[100%] to force wrapping
        <div className='flex w-0 basis-[100%] justify-start pr-[0.25rem] mt-[0.5rem] mb-[0.25rem]'>
            {children}
        </div>
    )
}

export function UserFormResponse() {
    const { response_text } = useResponseTextContext();

    return (
        (response_text !== undefined) && (response_text.length > 0) ? (
            <p className='max-w-[20rem] text-wrap whitespace-pre-wrap break-words mt-[0.25rem] italic text-red-600 dark:text-red-700'>
                {response_text}
            </p>
        ) : null
    );
}

export type UserFormProps = {
    btn_text: string,
    form_inputs: FormInputProps[],
    get_response: (forminfo : any) => Promise<any>
}

export default function UserForm({ btn_text, form_inputs, get_response }: UserFormProps) {
    const { response_text, set_response_text } = useResponseTextContext();
    const on_submit = async (forminfo : any) => {
        const response = await get_response(forminfo);
        const data = await response.json();

        set_response_text(data.message);
    }

    return (
        <Form
            submit_btn={
                <UserFormSubmitBtnContainer>
                    <SubmitBtn text={btn_text}/>
                </UserFormSubmitBtnContainer>
            }
            form_inputs={form_inputs}
            handle_submit={on_submit}
            refresh_on_submit={false}
            input_disp_width='w-[10rem]'
        />
    )
}