import React from 'react';

import APITemplate from '@src/components/api/page-template';
import SectionContainer from '@src/components/api/section-container';
import APIPublic from '@src/components/api/sections/api-public';
import APIInfo from '@src/components/api/api-info';

export default function AdminAPI() {
    return (
        <SectionContainer>
            <APIInfo heading="Public API" description="REST API with JWT token Authentication."/>
            <APIPublic/>
        </SectionContainer>
    )
}

