import React from 'react';
import UserSection from '@src//components/user/components/user-section';
import LoginForm from '@src/components/user/forms/login-form';

export default function Login() {
    return <UserSection header_text="Login" user_form={<LoginForm />} />;
}