import React from 'react';
import UserPage from '@src/components/user/user-page';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <UserPage>{children}</UserPage>;
}
