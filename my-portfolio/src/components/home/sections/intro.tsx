'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion'
import { FaGithubSquare } from 'react-icons/fa';
import { MdEmail, MdDownload } from "react-icons/md";
import { BsLinkedin } from 'react-icons/bs';

import { useSectionInView } from '@src/lib/hooks';
import { useActiveSectionContext } from '@src/context/active-section-context';
import { Section } from '@src/constants/home/section-data';
import { CONTACT_INFO } from '@src/constants/home/contact-info';
import SectionHeading from '@src/components/section-heading';

export default function Intro() {
    const { ref } = useSectionInView(Section.INTRO, 0.5);
    const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext();

    //The html <section> tag defines a section in a document. Basically the same as div but with more semantic meaning.
    return (
        <section
            id='home'
            ref={ref}
            className='mb-[7rem] max-w-[50rem] text-center sm:mb-0 scroll-mt-[100rem]'
        >
            <motion.div className='flex flex-col sm:flex-row items-center justify-center gap-[0.75rem] px-[1rem] text-lg font-medium pb-[2rem]'
                initial={{opacity: 0, y: 100}}
                animate={{opacity: 1, y: 0}}
                transition={{
                    delay: 0.3
                }}
            >
                {
                    //Styling based on parent state (group-{modifier})
                    //To style an element based on the state of some parent element, mark the parent with the group class, and use group-* modifiers like group-hover to style the target element
                    //transition gives animation a transition duration

                    //buttons are better to interact with something on the page
                    //anchor tags/react Link are better to navigate to another page even if they are still technically buttons
                    //cursor-pointer changes pointer to cursor upon clicking button (because it opens a save as file dialog) due to download property of anchor tag

                    //target=_blank Opens the linked document in a new window or tab

                    //active: is breakpoint for link when being clicked on, hover is when hovering over with mouse
                }
                <Link
                    // title='Contact Me'
                    href='#contact'
                    className='flex items-center gap-[0.5rem] rounded-full outline-none px-[1.75rem] py-[0.75rem] bg-gray-900 dark:bg-slate-700 text-white focus:scale-110 hover:scale-110 hover:bg-gray-950 active:scale-105 transition'
                    onClick={()=>{
                        setActiveSection(Section.CONTACT);
                        setTimeOfLastClick(Date.now());
                    }}
                >
                    Contact Me
                    <MdEmail className='opacity-70'/>
                </Link>
                
                <Link
                    // title='Download Resume'
                    className='flex items-center gap-[0.5rem] rounded-full outline-none px-[1.75rem] py-[0.75rem] bg-white focus:scale-110 hover:scale-110 active:scale-105 cursor-pointer borderBlack dark:bg-zinc-700 transition'
                    href='/downloads/Resume.pdf'
                    download
                >
                    Download Resume
                    <MdDownload className='opacity-70' />
                </Link>

                {
                    //next/link only creates an a tag (important for Search Engine Optimization (SEO)) if a string componenet is passed in for children
                }
                <a 
                    title='LinkedIn'
                    className='flex items-center gap-[0.5rem] rounded-full outline-none bg-white p-[1rem] text-gray-700 hover:text-gray-950 focus:scale-[1.15] hover:scale-[1.15] active:scale-105 cursor-pointer borderBlack dark:bg-zinc-700 dark:text-white/60 transition'
                    href={CONTACT_INFO.linkedin}
                    target='_blank'
                >
                    <BsLinkedin />
                </a>

                <a
                    title='GitHub'
                    className='flex items-center gap-[0.5rem] rounded-full outline-none bg-white p-[1rem] text-gray-700 hover:text-gray-950 text-[1.35rem] focus:scale-[1.15] hover:scale-[1.15] active:scale-105 cursor-pointer borderBlack dark:bg-zinc-700 dark:text-white/60 transition'
                    href={CONTACT_INFO.github}
                    target='_blank'
                >
                    <FaGithubSquare />
                </a>
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
