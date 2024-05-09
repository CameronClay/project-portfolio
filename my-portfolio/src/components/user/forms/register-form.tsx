'use client';

import React from 'react';
import UserForm from '@src//components/user/components/user-form';
import * as api_tmain from '@src/lib/api/main';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { REGISTER_USER_PAGE_PARAMS } from '@src/constants/user-forms/user-forms';

export default function RegisterForm() {
    const router = useRouter();
    const params = useSearchParams();
    const redirect_to = params.get('redirect');
    const redirect_query = redirect_to ? `?redirect=${redirect_to}` : '';

    return (
        <div>
            <UserForm
                btn_text="Register"
                form_inputs={REGISTER_USER_PAGE_PARAMS}
                get_response={async (forminfo: Record<string, string>) => {
                    if (forminfo.password !== forminfo.password_repeat) {
                        return Response.json({
                            message: 'Passwords do not match.',
                        }, {
                            status: 401,
                        });
                    }
                    const resp = await api_tmain.register(
                        forminfo.username,
                        forminfo.password
                    );

                    if (redirect_to && resp.status == 200) {
                        // router.push(redirect_to);
                        router.push(`/account/login${redirect_query}`);
                    }

                    return resp;
                }}
            />

            <Link
                title="Login"
                href={`/account/login${redirect_query}`}
                target="_parent"
                className="block link"
            >
                Already have an account?
            </Link>
        </div>
    );
}
