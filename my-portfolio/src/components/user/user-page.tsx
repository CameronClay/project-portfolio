import React from 'react';
import PageFooter from '@src/components/page-footer';
import MyToaster from '@src/components/mytoaster';
import TopBar from '@src/components/top-bar';
import PageHeader from '@src/components/user/page-header';
import PageContainer from '@src/components/api/page-container';
import ContextProviderElement from '@/src/context/api/context-provider-element';

export default function UserPage({ children } : { children: React.ReactNode }) {
    return (
        <ContextProviderElement>
            <PageContainer>
                <TopBar>
                    <PageHeader/>
                </TopBar>

                {children}

                <PageFooter/>

                <MyToaster/>
            </PageContainer>
        </ContextProviderElement>
    )
}