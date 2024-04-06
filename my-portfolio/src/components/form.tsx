import React, { FormEvent } from 'react';
import SubmitBtn from '@src/components/submit-btn';
import { formdata_to_json } from '@src/lib/utils/form-utils';

export type FormInputProps = {
    name: string,
    type: string,
    required: boolean,
    input_id: string,
    input_type?: string
}

export type FormProps = {
    header_text?: string,
    btn_text: string
    form_inputs: FormInputProps[],
    handle_submit: (forminfo : any) => Promise<any>,
    refresh_on_submit: boolean
}

export default function Form({header_text, btn_text, form_inputs, handle_submit, refresh_on_submit} : FormProps) {
    const on_submit = async (event: FormEvent<HTMLFormElement>) => {
        if(!refresh_on_submit) {
            event.preventDefault(); //prevent page refresh
        }

        // console.log('action'); //this is running but it is client component so log shows in the browser console
        const form_data = new FormData(event.currentTarget);
        const form_json = formdata_to_json(form_data);
        await handle_submit(form_json);
    }

    return (
        <form 
            onSubmit={on_submit}
        >
            {
                header_text ? <h3>{header_text}</h3> : null
            }

            <div className='flex flex-row items-center'>
                <ul className='flex flex-col justify-start w-full'>
                    {
                        form_inputs.map((input: FormInputProps) => (
                            <li 
                                className='flex flexrow flex-wrap' 
                                key={input.input_id}
                            >
                                <p className='mr-[2rem] text-nowrap'>
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
                                    className='h-[1rem] mb-[0.625rem] p-[0.75rem] emailInput group' 
                                />
                            </li>
                        ))
                    }
                </ul>
                
                <div className='flex justify-end w-full pr-[0.25rem]'>
                    <SubmitBtn text={btn_text}/>
                </div>
            </div>
        </form>
    )
}
