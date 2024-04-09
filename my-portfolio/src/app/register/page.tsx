import React from 'react';
import Register from '@src/components/user/register';
import UserPage from '@src/components/user/user-page';

export default function LoginPage() {
    return (
        <UserPage>
            <Register/>
        </UserPage>
    )
}