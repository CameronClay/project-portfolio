import React from 'react';

import APITemplate from '@src/components/api/page-template';
import SectionContainer from '@src/components/api/section-container';
import APIAdmin from '@src/components/api/sections/api-admin';
import APIInfo from '@src/components/api/api-info';

export default function AdminAPI() {
    return (
        <SectionContainer>
            <APIInfo heading="Admin API" description="REST API with JWT token Authentication. All methods require authentication with admin permissions."/>
            <APIAdmin/>
        </SectionContainer>
    )
}
