import React from 'react';
import UserSection from '@src/components/user/user-section';
import LoginForm from '@src/components/user/login-form';

export default function Login() {
    return (
        <UserSection
            header_text="Login"
            user_form={<LoginForm/>}
        />
    )
}