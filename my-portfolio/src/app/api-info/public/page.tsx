import React from 'react';

import SectionContainer from '@src/components/api/section-container';
import APIPublic from '@src/components/api/sections/api-public';
import APIInfo from '@src/components/api/api-info';
import APIDescription from '@src/components/api/api-description';

export default function PublicAPI() {
    return (
        <SectionContainer>
            <APIInfo
                heading="Public API"
            >
                <div className='px-[0.125rem]'>
                    <p>
                        <span className='font-bold'>REST API</span> with <span className='font-bold'>JWT</span> token Authentication.{' '}
                    </p>
                    <APIDescription />
                </div>
            </APIInfo>

            <APIPublic />
        </SectionContainer>
    );
}