import React from 'react';
import { CONTACT_INFO } from '@src/constants/home/contact-info';
import { FaGithubSquare } from 'react-icons/fa';

export default function PageFooter() {
    return (
        <footer className='flex flex-row items-center justify-center px-[1rem] text-center bg-zinc-700 dark:bg-zinc-900 text-white text-opacity-90 dark:text-opacity-80'>
            {
                //block: Displays an element as a block element (like <p>). It starts on a new line, and takes up the whole width
                //small/span are by default inline (block changes that)
            }
            <div
                className='flex flex-col items-center justify-center w-full gap-[0.5rem] py-[1.25rem] whitespace-wrap text-wrap lg:text-nowrap lg:whitespace-nowrap '
            >
                <p className='text-xs'>
                    Built using React and Next.js (App Router & Server Actions),
                    TypeScript, Tailwind CSS,
                    Framer-Motion, React-Email & Nodemailer,
                    React-Intersection-Observer, and OutsideClick-React.
                </p>
                <p className='text-xs'>
                    &copy; {`2024 ${CONTACT_INFO.name}`}. All rights reserved.
                </p>
            </div>
            <div
                className='flex justify-end'
            >
                <a
                    title='View on GitHub'
                    className='flex items-center justify-center outline-none w-[2.75rem] h-[2.75rem] bg-white p-[0.25rem] text-gray-700 hover:text-gray-950 hover:bg-gray-400 hover:dark:bg-gray-900 text-[1.35rem] active:scale-[1.05] cursor-pointer borderBlack dark:bg-zinc-700 dark:text-white/60 transition'
                    href='https://github.com/CameronClay/project-portfolio'
                    target='_blank'
                >
                    <FaGithubSquare size={32}/>
                </a>   
            </div>
        </footer>
    );
}