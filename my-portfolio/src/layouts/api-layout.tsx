import React from 'react';
import APITemplate from '@src/components/api/page/page-template';

export default function APILayout({ children }: { children?: React.ReactNode }) {
    return (
        <APITemplate>
            {children}
        </APITemplate>
    );
}