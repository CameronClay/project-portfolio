'use client';

import React from 'react';
import { useResponseTextContext } from '@src/context/response-text-context';
import Form, { FormInputProps } from '@src/components/form';
import clsx from 'clsx';
import SubmitBtn from '@src/components/submit-btn';
import { usePathname, useRouter } from 'next/navigation';

export type APIEndpointFormProps = {
    btn_text: string;
    parameters: FormInputProps[];
    get_response: (forminfo: Record<string, string>) => Promise<Response>;
};

//form element that displays information about each parameter, handles response text upon submission, and redirects to login if unauthorized
export default function APIEndpointForm({
    btn_text,
    parameters,
    get_response,
}: APIEndpointFormProps) {
    const router = useRouter();
    const url = usePathname();
    const redirect_str = `/account/login/?redirect=${url}`;
    const { set_response_text } = useResponseTextContext();

    const on_submit = async (forminfo: Record<string, string>) => {
        const response = await get_response(forminfo);
        const data =
            response.headers.get('content-type') == 'application/json'
                ? ((await response.json()) as Record<string, unknown>)
                : await response.text();

        set_response_text(
            JSON.stringify(
                {
                    status: response.status,
                    data: data,
                },
                null,
                4
            )
        );

        //if request was unauthorized and requires login, redirect to redirect_str
        if (
            response.status == 401 &&
            (data as Record<string, unknown>).auth_msg !== undefined
        ) {
            router.push(redirect_str);
        }
    };

    return (
        <div className="">
            <p
                className={clsx('mb-[1rem]', {
                    hidden: parameters.length == 0,
                })}
            >
                Parameters (<span className="font-bold">*</span> Indicates
                required):
            </p>

            <Form
                submit_btn={
                    //ml-auto positions the button the end of flexbox
                    //basis-full forces the button onto a new line
                    <div className="ml-[0rem] basis-full md:basis-0 md:ml-auto pr-[0.25rem]">
                        <SubmitBtn text={btn_text} />
                    </div>
                }
                form_inputs={parameters}
                handle_submit={on_submit}
                refresh_on_submit={false}
                input_disp_width="w-[10rem]"
            />
        </div>
    );
}
