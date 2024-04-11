import React from 'react';
import Link from 'next/link';
import { FaGithubSquare } from 'react-icons/fa';
import { MdEmail, MdDownload } from "react-icons/md";
import { BsLinkedin } from 'react-icons/bs';

import { useActiveSectionContext } from '@src/context/home/active-section-context';
import { CONTACT_INFO } from '@src/constants/home/contact-info';
import { Section } from '@src/constants/home/section-data';
import { InfoBtn, InfoBtnBasic } from '@src/components/info-btn';

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
            <InfoBtn
                // title='Contact Me'
                href='#contact'
                classNameEtc='!bg-slate-600 dark:!bg-slate-700 !text-white'
                onClick={()=>{
                    setActiveSection(Section.CONTACT);
                    setTimeOfLastClick(Date.now());
                }}
            >
                Contact Me
                <MdEmail className='opacity-70'/>
            </InfoBtn>
            
            <InfoBtn
                // title='Download Resume'
                classNameEtc='bg-white dark:bg-zinc-700'
                href='/downloads/Resume_CameronClay.pdf'
                download
            >
                Download Resume
                <MdDownload className='opacity-70' />
            </InfoBtn>

            {
                //next/link only creates an a tag (important for Search Engine Optimization (SEO)) if a string componenet is passed in for children
            }
            <InfoBtnBasic 
                title='LinkedIn'
                href={CONTACT_INFO.linkedin}
                target='_blank'
            >
                <BsLinkedin />
            </InfoBtnBasic>

            <InfoBtnBasic
                title='GitHub'
                href={CONTACT_INFO.github}
                target='_blank'
            >
                <FaGithubSquare />
            </InfoBtnBasic>
        </div>
    )
}
