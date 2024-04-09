'use client';

import React from 'react';
import UserForm from '@src/components/user/user-form';
import * as api_tmain from '@src/lib/api/test-main';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

export default function RegisterForm() {
    const router = useRouter();
    const params = useSearchParams();
    const redirect_to = params.get('redirect');
    const redirect_query = redirect_to ? `?redirect=${redirect_to}` : '';

    return (
        <div>
            <UserForm
                btn_text="Register"
                form_inputs={[
                    {
                        name: "Username",
                        type:"string",
                        input_type: "text",
                        required: true,
                        input_id: "username"
                    },
                    {
                        name: "Password",
                        type:"string",
                        input_type: "password",
                        required: true,
                        input_id: "password"
                    },
                    {
                        name: "Repeat password",
                        type:"string",
                        input_type: "password",
                        required: true,
                        input_id: "password_repeat"
                    }
                ]}
                get_response={async (forminfo : any) => {
                    let resp : Response;
                    
                    if(forminfo.password !== forminfo.password_repeat) {
                        resp = Response.json({status: 401, message: "Passwords do not match."});
                    }
                    resp = await api_tmain.register(forminfo.username, forminfo.password);

                    if(redirect_to) {
                        // router.push(redirect_to);
                        router.push(`/login${redirect_query}`);
                    }

                    return resp;
                }}
            />

            <Link 
                title="Login"
                href={`/login${redirect_query}`}
                target='_parent'
                className='block link'
            >
                Already have an account?
            </Link>
        </div>
    )
}