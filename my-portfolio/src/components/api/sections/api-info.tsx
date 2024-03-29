'use client';

import React from 'react';
import SectionHeading from '@src/components/api/section-heading';
import { Section } from '@src/constants/api/section-data';
import { useSectionInView } from '@src/lib/hooks';

export default function APIInfo() {
    const { ref } = useSectionInView(Section.INFO, 0.75);

    return (
        <section
            id='info'
            ref={ref}
            className='scroll-mt-[5rem] mb-[2rem]'
        >
            <SectionHeading>
                API Info
            </SectionHeading>

            <p className='px-[0.125rem]'>
                REST API with JWT token Authentication.
            </p>
        </section>
    )
}