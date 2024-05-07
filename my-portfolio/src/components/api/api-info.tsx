'use client'; //needs to be a client component because it uses react hooks (even though it is a custom hook)

import React from 'react';
import SectionHeading from '@src/components/api/section-heading';
import { Section } from '@src/constants/api/section-data';
import { useSectionInView } from '@src/lib/hooks';

type APIInfoProps = {
    heading: string;
    children?: React.ReactNode;
};

export default function APIInfo({ heading, children }: APIInfoProps) {
    const { ref } = useSectionInView(Section.INFO, 0.80);

    return (
        <section id="info" ref={ref} className="scroll-mt-[5rem] mb-[2rem]">
            <SectionHeading>{heading}</SectionHeading>

            {children}
        </section>
    );
}
