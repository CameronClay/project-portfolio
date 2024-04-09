// 'use client';
import React from 'react';
import Login from '@src/components/user/login';
import UserPage from '@src/components/user/user-page';
// import { useRouter } from 'next/navigation';

export default function LoginPage({ params } : { params: any }) {
    // const router = useRouter();
    return (
        <UserPage>
            <Login/>
        </UserPage>
    )
}