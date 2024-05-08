import React from 'react';

import SectionContainer from '@src/components/api/section-container';
import APIAdmin from '@src/components/api/sections/api-admin';
import APIInfo from '@src//components/api/api-info';
import APIDescription from '@src//components/api/api-description';

export default function AdminAPI() {
    return (
        <SectionContainer>
            <APIInfo
                heading="Admin API"
            >
                <div className='px-[0.125rem]'>
                    <p>
                        <span className='font-bold'>REST API</span> with <span className='font-bold'>JWT</span> token Authentication.{' '}
                        All methods require authentication with admin permissions.
                    </p>
                    <APIDescription />
                </div>

            </APIInfo>

            <APIAdmin />
        </SectionContainer>
    );
}
