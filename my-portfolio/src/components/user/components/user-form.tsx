'use client';

import React from 'react';
import Form from '@src/components/form';
import SubmitBtn from '@src/components/submit-btn';
import { useResponseTextContext } from '@src/context/response-text-context';
import { FormInputProps } from '@src/components/form';
import { GenericResponse } from '@src/constants/api/generic';

function UserResponseElement({
    children,
    aria_label,
    classNameEtc,
}: {
    children: React.ReactNode;
    aria_label: string;
    classNameEtc?: string;
}) {
    let className =
        'max-w-[20rem] text-wrap whitespace-pre-wrap break-words mt-[0.25rem] italic';
    if (classNameEtc) {
        className += ` ${classNameEtc}`;
    }

    return <p aria-label={aria_label} className={className}>{children}</p>;
}

//displays form response within an ResponseTextContextProvider
export function UserFormResponse() {
    const { response_text, response_text_error } = useResponseTextContext();

    return (
        <div>
            {response_text !== undefined && response_text.length > 0 ? (
                <UserResponseElement aria_label="Response" classNameEtc="text-green-600 dark:text-green-700">
                    {response_text}
                </UserResponseElement>
            ) : null}

            {response_text_error !== undefined && response_text_error.length > 0 ? (
                <UserResponseElement aria_label="Response Error" classNameEtc="text-red-600 dark:text-red-700">
                    {response_text_error}
                </UserResponseElement>
            ) : null}
        </div>
    );
}

export type UserFormProps = {
    btn_text: string;
    form_inputs: FormInputProps[];
    get_response: (forminfo: Record<string, string>) => Promise<Response>;
};

//form where response text is updated according to response received from get_response
//this element must be nested within a ResponseTextContextProvider and ResponseTextContextProvider should include a UserFormResponse for display of response text
export default function UserForm({
    btn_text,
    form_inputs,
    get_response,
}: UserFormProps) {
    const { set_response_text, set_response_text_error } =
        useResponseTextContext();
    const on_submit = async (forminfo: Record<string, string>) => {
        const response = await get_response(forminfo);
        const data = (await response.json()) as GenericResponse;

        if (response.status == 200) { //success response status
            set_response_text(data.message);
            set_response_text_error('');
        } else { //error response status
            set_response_text_error(data.message);
            set_response_text('');
        }
    };

    return (
        <Form
            submit_btn={
                <div className="flex w-0 basis-[100%] justify-start pr-[0.25rem] mt-[0.5rem] mb-[0.25rem]">
                    <SubmitBtn text={btn_text} />
                </div>
            }
            form_inputs={form_inputs}
            handle_submit={on_submit}
            refresh_on_submit={false}
            input_disp_width="w-[10rem]"
        />
    );
}