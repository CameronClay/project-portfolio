'use client'; //needs to be a client component because it uses react hooks (even though it is a custom hook)

import React from 'react';
import SectionHeading from '@src/components/api/section-heading';
import { Section } from '@src/constants/api/section-data';
import { useSectionInView } from '@src/lib/hooks';

type APIInfoProps = {
    heading     : string,
    description : string
}

export default function APIInfo({ heading, description } : APIInfoProps) {
    const { ref } = useSectionInView(Section.INFO, 0.75);

    return (
        <section
            id='info'
            ref={ref}
            className='scroll-mt-[5rem] mb-[2rem]'
        >
            <SectionHeading>
                {heading}
            </SectionHeading>

            <p className='px-[0.125rem]'>
                {description}
            </p>
        </section>
    )
}