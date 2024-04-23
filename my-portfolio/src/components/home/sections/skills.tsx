'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SKILLS_DATA } from '@src/constants/home/section-data';
import { useSectionInView } from '@src/lib/hooks';
import { Section } from '@src/constants/home/section-data';
import SectionHeading from '@src/components/home/section-heading';

const fadeInAnimationVariants = {
    initial: {
        opacity: 0,
        y: 100,
    },
    animate: (index: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: 0.05 * index,
        },
    }),
};

export default function Skills() {
    const { ref } = useSectionInView(Section.SKILLS);

    return (
        <section
            id="skills"
            ref={ref}
            className="max-w-[53rem] scroll-mt-[7rem] text-center mb-[5rem] sm:mb-[7rem]"
        >
            <SectionHeading>My Skills</SectionHeading>
            <ul className="flex flex-wrap justify-center gap-[0.75rem] text-lg text-slate-900">
                {
                    //one time fade in animation
                    SKILLS_DATA.map((skill, index) => (
                        <motion.li
                            className="bg-white borderBlack rounded-xl px-[1.25rem] py-[0.75rem] dark:bg-white/[10%] dark:text-white/[90%]"
                            key={index}
                            variants={fadeInAnimationVariants}
                            initial="initial"
                            whileInView="animate"
                            viewport={{
                                once: true,
                                amount: 'all',
                            }}
                            custom={index} //used to pass index to animate function in fadeInAnimationVariants
                        >
                            {skill}
                        </motion.li>
                    ))
                }
            </ul>
        </section>
    );
}
