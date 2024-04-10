import React from 'react';
import APITemplate from '@src/components/api/page-template';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <APITemplate>
            {children}
        </APITemplate>
    );
}