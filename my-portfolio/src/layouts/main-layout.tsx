import React from 'react';
import PageContainer from '@src/components/home/page-container';
import PageFooter from '@src/components/page-footer';
import MyToaster from '@src/components/mytoaster';

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <PageContainer>
            {children}
            <PageFooter/>
            <MyToaster/>
        </PageContainer>
    )
}