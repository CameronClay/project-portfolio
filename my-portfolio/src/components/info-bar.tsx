import React from 'react';
import Link from 'next/link';
import { FaGithubSquare } from 'react-icons/fa';
import { MdEmail, MdDownload } from 'react-icons/md';
import { BsLinkedin } from 'react-icons/bs';

import { useActiveSectionContext } from '@src/context/home/active-section-context';
import { CONTACT_INFO } from '@src/constants/home/contact-info';
import { Section } from '@src/constants/home/section-data';
import { InfoBtn, InfoBtnBasic } from '@src/components/info-btn';

export default function InfoBar() {
    const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext();
    return (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-[0.75rem] px-[1rem] text-lg font-medium">
            <InfoBtn
                href="#contact"
                classNameEtc="!bg-slate-600 dark:!bg-slate-700 !text-white"
                onClick={() => {
                    setActiveSection(Section.CONTACT);
                    setTimeOfLastClick(Date.now());
                }}
            >
                Contact Me
                <MdEmail className="opacity-70" />
            </InfoBtn>

            <InfoBtn
                classNameEtc="bg-white dark:bg-zinc-700"
                href="/downloads/Resume_CameronClay.pdf"
                download
            >
                Download Resume
                <MdDownload className="opacity-70" />
            </InfoBtn>

            <InfoBtnBasic
                title="LinkedIn"
                href={CONTACT_INFO.linkedin}
                target="_blank"
                classNameEtc='p-[0.85rem]'
            >
                <BsLinkedin size={25} />
            </InfoBtnBasic>

            <InfoBtnBasic
                title="GitHub"
                href={CONTACT_INFO.github}
                target="_blank"
                classNameEtc='p-[0.75rem]'
            >
                <FaGithubSquare size={28} />
            </InfoBtnBasic>
        </div>
    );
}