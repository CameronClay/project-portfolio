import React from 'react';
import UserSection from '@src/components/user/user-section';
import RegisterForm from '@src/components/user/forms/register-form';

export default function Login() {
    return <UserSection header_text="Register" user_form={<RegisterForm />} />;
}
