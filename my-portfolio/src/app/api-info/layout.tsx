import React from 'react';
import APILayout from '@src/layouts/api-layout';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <APILayout>{children}</APILayout>;
}
