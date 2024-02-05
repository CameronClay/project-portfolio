'use client';

import React from 'react';
import { motion } from 'framer-motion'

import { useSectionInView } from '@src/lib/hooks';
import { Section } from '@src/constants/home/section-data';
import { CONTACT_INFO } from '@src/constants/home/contact-info';
import SectionHeading from '@src/components/section-heading';
import InfoBar from '@src/components/info-bar';

export default function Info() {
    const { ref } = useSectionInView(Section.INFO, 0.5);

    //The html <section> tag defines a section in a document. Basically the same as div but with more semantic meaning.
    return (
        <section
            id='home'
            ref={ref}
            className='mb-[7rem] max-w-[50rem] text-center sm:mb-0 scroll-mt-[100rem]'
        >
            <motion.div className='pb-[2rem]'
                initial={{opacity: 0, y: 100}}
                animate={{opacity: 1, y: 0}}
                transition={{
                    delay: 0.3
                }}
            >
                <InfoBar/>
            </motion.div>
            <motion.div 
                className=''
                initial={{opacity: 0, y: 100}}
                animate={{opacity: 1, y: 0}}
                transition={{
                    delay: 0.2
                }}
            >
                <SectionHeading>About Me</SectionHeading>

                {
                    //text-2xl is the size of the text
                    //font-medium is the boldness/lightness of the text
                    //!leading-[1.4] modifies the line height pof text-2xl
                }
                <h1 className='mb-[0.25rem] mt-0 pl-[2rem] pr-[1rem] text-2xl font-light !leading-[1.4] sm:text-3xl text-center'>
                    {
                        //first set of {} enables the use of javascript
                        //`` is for string interpolation
                        //${} is a variable
                    }
                    <span className=''>Hello, my name is</span> <span className='font-bold'>{CONTACT_INFO.name}</span>. I am a passionate{' '}
                    <span className='font-bold'>software developer</span> with a{' '}
                    <span className="font-bold">bachelor's degree</span> in <span className="font-bold">Computer Science</span>{' '} 
                    seeking an <span className='font-bold'>entry-level programmer/software engineer position</span> in an{' '}
                    <span className='font-bold'>environment that values quality and maintainable code</span>.
                </h1>
            </motion.div>
        </section>
    )
}
