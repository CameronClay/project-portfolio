'use client';

import React from 'react';
import Link from 'next/link';
import clsx from 'clsx'; //clsxx helps with conditionally applying classes
import { motion } from 'framer-motion';

import { useActiveSectionContext } from '@src/context/home/active-section-context';
import DarkMode from '@src/components/dark-mode';
import { SectionType } from '@src/constants/section-type';

type PageHeaderProps = {
    links: readonly SectionType[];
    children: React.ReactNode;
};

export default function PageHeaderTemplate({
    links,
    children,
}: PageHeaderProps) {
    const { activeSection, setActiveSection, setTimeOfLastClick } =
        useActiveSectionContext(); //use react context api because using useState makes it so cannot set the section in the individual sections because the hook only would exist in the header

    //The <header> element represents a container for introductory content or a set of navigational links.
    //<header> typically contains: one or more heading elements (<h1> - <h6>), logo or icon, authorship information
    //need relative positioning to make z index work
    return (
        // {
        //     // motion.div is a div element with special props (using package framer-motion)
        //     // fixed means element is positioned relative to the browser window/viewport (scrolls with you)
        //     // shadow-lg is a utility for box shadowing an element
        //     // shadow-black sets color of box shadow /[0.03] sets the opacity 0.03/1 or /3 is 3%
        //     // left-1/2 sets left side of element to be in the middle of the page
        //     // -translate-x-1/2 moves element to the left by half of its width (makes center of element in the center of the page)
        //     // w-full sets width to 100%

        //     // flex
        //     // flex-wrap - The flex-wrap CSS property sets whether flex items are forced onto one line or can wrap onto multiple lines. If wrapping is allowed, it sets the direction that lines are stacked. In tailwind css, default is wrap.
        //     // items-center - Alligns contet along primary axis.
        //     // justify-center - Alligns content along secondary axis.
        //     // gap-y-[0.25rem] - Gap of 0.25prem (1px) between grid and flexbox items.
        //     // flex-nowrap - Disables wrapping for flexbox.
        //     // flex-wrap - Enables wrapping for flexbox.
        //     // w/h-[initial] means set width/height to its default value
        //     // background for navbar -- doesnt need to be fixed position because this component is contained in top-bar
        // }

        <motion.header
            className="flex flex-row z-[999] relative items-center justify-start rounded-none"
            initial={{ y: -75, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
        >
            <div className="hidden sm:block whitespace-wrap text-wrap lg:text-nowrap lg:whitespace-nowrap sm:mx-[0.25rem] my-[0rem] lg:mx-[0.5rem]">
                <p className="headerItemText font-bold text-white text-opacity-85 dark:text-opacity-70">
                    Cameron Clay
                </p>
            </div>

            {
                //The <nav> HTML element represents a section of a page whose purpose is to provide navigation links, either within the current document or to other documents. Common examples of navigation sections are menus, tables of contents, and indexes.
                //navbar width is width of all the links (flex items) combined
                //why does motion.li need relative positioning to work?
                //it seems to have to do with absolute positioning of the motion.span
                //Absolute positioning refers to positioning an element relative to its nearest positioned ancestor (i.e. the nearest parent element with a position value of relative, absolute, or fixed).
            }
            <nav className="flex flex-row flex-wrap justify-center sm:justify-end w-full gap-[0.5rem] mr-[0.25rem] sm:mr-[0rem]">
                <ul className="flex flex-row flex-wrap headerContainerSpacing font-medium transition">
                    {links.map((link) => (
                        <li
                            className="relative flex justify-center headerSectionBase"
                            key={link.link}
                        >
                            {
                                //background for link
                                //clsx used for conditional properties on the link (not background blob)
                            }

                            <div className="absolute h-full w-full bg-white bg-opacity-80 dark:bg-zinc-600 -z-[16]" />

                            <Link
                                className={clsx(
                                    'select-none flex items-center justify-center w-full h-full dark:text-zinc-300 hover:bg-slate-400 hover:dark:bg-slate-600 transition',
                                    {
                                        '!text-red-700 dark:!text-amber-100':
                                            activeSection === link.name,
                                    }
                                )}
                                href={link.link}
                                onClick={() => {
                                    setActiveSection(link.name);
                                    setTimeOfLastClick(Date.now());
                                }}
                            >
                                {link.name}

                                {
                                    //conditional rendered background blob for the active section in the header
                                    //how this works is when the section is changed the span will be removed and a new one will come into view
                                    //scrolling changing the section is done with the intersection observer api (react-intersection-observer package in react)
                                    //The inset CSS property is a shorthand that corresponds to the top, right, bottom, and/or left properties. It has the same multi-value syntax of the margin shorthand.
                                    //why does absolute positioning make this work and it doesnt work with any other (fixed/relative/etc...?)
                                    //Absolute-positioned elements are completely taken out of the regular flow of the web page.
                                    //Absolute positioning refers to positioning an element relative to its nearest positioned ancestor (i.e. the nearest parent element with a position value of relative, absolute, or fixed
                                    //They are not positioned based on their usual place in the document flow, but based on the position of their ancestor.
                                    //-z-[15] needed to put the active section blob behind the link text ({link.name})
                                }
                                {link.name === activeSection && (
                                    <motion.span
                                        className="absolute h-[0.125rem] z-[15] bottom-0 left-0 right-0 dark:bg-amber-100 bg-red-700"
                                        // className='absolute rounded-full bg-slate-200 inset-0 -z-[15] dark:bg-zinc-500 top-[12.5%] bottom-[12.5%]'
                                        layoutId="activeSection"
                                        transition={{
                                            type: 'spring',
                                            stiffness: 500,
                                            damping: 40,
                                        }}
                                    />
                                )}
                            </Link>
                        </li>
                    ))}
                    <div className="flex flex-row flex-wrap headerContainerSpacing">
                        {children}

                        <div className="flex flex-shrink-0 h-[3.25rem] w-[3.25rem]">
                            <DarkMode />
                        </div>
                    </div>
                </ul>
            </nav>
        </motion.header>
    );
}