import React, { FormEvent } from 'react';
// import SubmitBtn from '@src/components/submit-btn';
import { formdata_to_json } from '@src/lib/utils/form-utils';

export enum ParamLocation {
    QUERY = 0,
    BODY = 1,
}

export type FormInputProps = {
    name: string;
    type: string;
    required: boolean;
    location: ParamLocation;
    input_id: string;
    input_type?: string;
    hidden?: boolean;
};

export type FormProps = {
    header_text?: string;
    input_disp_width: string;
    submit_btn: React.ReactNode;
    form_inputs: FormInputProps[];
    handle_submit: (forminfo: Record<string, string>) => Promise<void>;
    refresh_on_submit: boolean;
};

//Note form submission is done manually here. Can also directly submit the form to the api endpoint. However, I wanted to learn how to do it manually to learn more about interacting with API endpoints.

export default function Form({
    header_text,
    input_disp_width,
    submit_btn,
    form_inputs,
    handle_submit,
    refresh_on_submit,
}: FormProps) {
    const on_submit = async (event: FormEvent<HTMLFormElement>) => {
        if (!refresh_on_submit) {
            event.preventDefault(); //prevent page refresh
        }

        // console.log('action'); //this is running but it is client component so log shows in the browser console
        const form_data = new FormData(event.currentTarget);
        const form_json = formdata_to_json(form_data);
        await handle_submit(form_json);
    };

    return (
        //get around Promise-returning function provided to attribute where a void return was expected.  @typescript-eslint/no-misused-promises
        <form onSubmit={(event) => void on_submit(event)}>
            {header_text ? <h3>{header_text}</h3> : null}

            <div className="flex flex-row flex-wrap">
                <ul className="flex flex-col justify-start">
                    {form_inputs.filter((input) => !input.hidden).map((input: FormInputProps) => (
                        <li
                            className="flex flexrow flex-wrap"
                            key={input.input_id}
                        >
                            <p
                                className={`mr-[2rem] text-nowrap ${input_disp_width}`}
                            >
                                {input.name}
                            </p>

                            {
                                //form and id here are optional
                            }
                            <input
                                id={input.input_id}
                                name={input.input_id}
                                type={input.input_type ?? 'text'}
                                required={input.required}
                                maxLength={80}
                                className="h-[1rem] mb-[0.625rem] p-[0.75rem] emailInput group"
                            />
                        </li>
                    ))}
                </ul>

                {submit_btn}
            </div>
        </form>
    );
}
