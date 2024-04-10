'use client'; //needs to be a client component because it uses react hooks (even though it is a custom hook)

import React from 'react';
import { Section } from '@src/constants/api/section-data';
import { useSectionInView } from '@src/lib/hooks';

type ApiProps = {
    children: React.ReactNode
};

export default function Api({ children }: ApiProps) {
    const { ref } = useSectionInView(Section.API, 0.65);

    return (
        <section
            id='api'
            ref={ref}
            className='scroll-mt-[5rem] mb-[2rem]'
        >         
            <p className='text-2xl font-bold px-[0.125rem]'>
                API
            </p>

            {children}
        </section>
    )
}
