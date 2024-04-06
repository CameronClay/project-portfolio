import React from 'react';

import PageFooter from '@src/components/page-footer';
import MyToaster from '@src/components/mytoaster';
import TopBar from '@src/components/top-bar';
import PageHeader from '@/src/components/api/page-header';
import ContextProviderElement from '@/src/context/api/context-provider-element';
import PageContainer from '@src/components/api/page-container';

export default function APITemplate({ section_container } : { section_container: React.ReactNode }) {
    return (
        <ContextProviderElement>
            <PageContainer>
                <TopBar>
                    <PageHeader/>
                </TopBar>

                {section_container}

                <PageFooter/>

                <MyToaster/>
            </PageContainer>
        </ContextProviderElement>
    )
}
