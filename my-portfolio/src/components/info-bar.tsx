import React from 'react';
import Link from 'next/link';
import { FaGithubSquare } from 'react-icons/fa';
import { MdEmail, MdDownload } from "react-icons/md";
import { BsLinkedin } from 'react-icons/bs';

import { useActiveSectionContext } from '@src/context/active-section-context';
import { CONTACT_INFO } from '@src/constants/home/contact-info';
import { Section } from '@src/constants/home/section-data';

export default function InfoBar() {
    const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext();
    return (
        <div 
            className='flex flex-col sm:flex-row items-center justify-center gap-[0.75rem] px-[1rem] text-lg font-medium'
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
                className='flex items-center gap-[0.5rem] outline-none px-[1.75rem] py-[0.75rem] bg-gray-900 dark:bg-slate-700 text-white focus:scale-110 hover:scale-110 hover:bg-gray-950 active:scale-105 transition borderBlack'
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
                className='flex items-center gap-[0.5rem] outline-none px-[1.75rem] py-[0.75rem] bg-white focus:scale-110 hover:scale-110 active:scale-105 cursor-pointer borderBlack dark:bg-zinc-700 transition'
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
                className='flex items-center gap-[0.5rem] outline-none bg-white p-[1rem] text-gray-700 hover:text-gray-950 focus:scale-[1.15] hover:scale-[1.15] active:scale-105 cursor-pointer borderBlack dark:bg-zinc-700 dark:text-white/60 transition'
                href={CONTACT_INFO.linkedin}
                target='_blank'
            >
                <BsLinkedin />
            </a>

            <a
                title='GitHub'
                className='flex items-center gap-[0.5rem] outline-none bg-white p-[0.90rem] text-gray-700 hover:text-gray-950 text-[1.35rem] focus:scale-[1.15] hover:scale-[1.15] active:scale-105 cursor-pointer borderBlack dark:bg-zinc-700 dark:text-white/60 transition'
                href={CONTACT_INFO.github}
                target='_blank'
            >
                <FaGithubSquare />
            </a>
        </div>
    )
}
