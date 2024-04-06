import React from 'react';

export type FormInputProps = {
    name: string,
    type: string,
    required: boolean,
    input_id: string,
    input_type?: string
}

type FormInputProps = {
    endpoint: string,
    btn_text: string
    parameters: APIParamater[],
    get_response: (forminfo : any) => Promise<Response>,
}

export default function Login() {
  return (
    <div>
        <h3>Login</h3>

        <div className='flex flex-row items-center'>
                <ul className='flex flex-col justify-start w-full'>
                    {
                        parameters.map((param: APIParamater) => (
                            <li 
                                className='flex flexrow flex-wrap' 
                                key={param.input_id}
                            >
                                <p className='mr-[2rem] text-nowrap'>
                                    {param.name}: {param.type} {param.required ? '(*)' : ''}
                                </p>
        
                                {
                                    //form and id here are optional
                                }
                                <input
                                    id={param.input_id}
                                    name={param.input_id}
                                    type={param.input_type ?? 'text'}
                                    required={param.required}
                                    maxLength={80}
                                    className='h-[1rem] mb-[0.625rem] p-[0.75rem] emailInput group' 
                                />
                            </li>
                        ))
                    }
                </ul>
                
                <div className='flex justify-end w-full pr-[0.25rem]'>
                    <TestBtn text={btn_text}/>
                </div>
            </div>

    </div>
  )
}
