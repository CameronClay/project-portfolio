import React from 'react';

import TopBar from '@src/components/page/top-bar';
import PageHeader from '@src/components/api/page/page-header';
import ContextProviderElement from '@src/context/api/context-provider-element';

export default function APITemplate({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ContextProviderElement>
            <TopBar>
                <PageHeader />
            </TopBar>

            {children}
        </ContextProviderElement>
    );
}