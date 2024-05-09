'use client';

import React from 'react';
import { motion } from 'framer-motion';

import SectionHeading from '@src//components/home/components/section-heading';
import { PROJECTS_DATA } from '@src/constants/home/section-data';
import Project from '@src/components/home/components/project';
import { useSectionInView } from '@src/lib/hooks';
import { Section } from '@src/constants/home/section-data';

export default function Projects() {
    const { ref } = useSectionInView(Section.PROJECTS, 0.28);

    return (
        <motion.section
            id="projects"
            ref={ref}
            className="scroll-mt-[7rem] mb-[5rem] sm:mb-[7rem]"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                delay: 0.125,
            }}
        >
            <SectionHeading>My Projects</SectionHeading>
            <p className="text-center pb-5">
                * <span className="font-semibold">Hover</span> over image to see
                a fuller view or <span className="font-semibold">click</span> on
                it to see the full-sized image
            </p>
            <div>
                {
                    //<></> is a react fragement (esentially an empty element when you dont want to clutter up the document) [Same as React.Fragment but cannot have props, e.g. key]
                    //Project does not accept key property so put it on the react fragment (does not need to be a div or similar component)
                }

                {PROJECTS_DATA.map((project, index) => (
                    <React.Fragment key={index}>
                        <Project {...project} />
                    </React.Fragment>
                ))}
            </div>
        </motion.section>
    );
}