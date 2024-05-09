'use client';

import React from 'react';
import UserForm from '@src//components/user/components/user-form';
import * as api_tmain from '@src/lib/api/main';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { LOGIN_USER_PAGE_PARAMS } from '@src/constants/user-forms/user-forms';

export default function LoginForm() {
    const router = useRouter();
    const params = useSearchParams();
    const redirect_to = params.get('redirect');
    const redirect_query = redirect_to ? `?redirect=${redirect_to}` : '';

    return (
        <div>
            <UserForm
                btn_text="Login"
                form_inputs={LOGIN_USER_PAGE_PARAMS}
                get_response={async (forminfo: Record<string, string>) => {
                    const resp = await api_tmain.login(
                        forminfo.username,
                        forminfo.password
                    );
                    if (redirect_to && resp.status == 200) {
                        router.push(redirect_to);
                    }
                    return resp;
                }}
            />

            <Link
                title="Register"
                href={`/account/register${redirect_query}`}
                target="_parent"
                className="block link"
            >
                Don't have an account?
            </Link>
        </div>
    );
}
