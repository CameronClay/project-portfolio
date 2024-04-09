'use client';

import React from 'react';
import UserForm from '@src/components/user/user-form';
import * as api_tmain from '@src/lib/api/test-main';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

export default function LoginForm() {
    const router = useRouter();
    const params = useSearchParams();
    const redirect_to = params.get('redirect');
    const redirect_query = redirect_to ? `?redirect=${redirect_to}` : '';

    return (
        <div>
            <UserForm
                btn_text="Login"
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
                    }
                ]}
                get_response={async (forminfo : any) => {
                    const resp = await api_tmain.login(forminfo.username, forminfo.password);
                    if(redirect_to) {
                        router.push(redirect_to);
                    }
                    return resp;
                }}
            />

            <Link
                title="Register"
                href={`/register${redirect_query}`}
                target='_parent'
                className='block link'
            >
                Don't have an account?
            </Link>
        </div>
    )
}