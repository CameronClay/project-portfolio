import React from 'react';
import { CONTACT_INFO } from '@src/constants/home/contact-info';

export default function PageFooter() {
    return (
        <footer className='py-[1.5rem] px-[1rem] text-center bg-zinc-700 dark:bg-zinc-900 text-white text-opacity-90 dark:text-opacity-80'>
            {
                //block: Displays an element as a block element (like <p>). It starts on a new line, and takes up the whole width
                //small/span are by default inline (block changes that)
            }
            <span className='mb-2 block text-xs'>
                &copy; {`2024 ${CONTACT_INFO.name}`}. All rights reserved.
            </span>
            <p className='text-xs'>
                Built using React and Next.js (App Router & Server Actions),
                TypeScript, Tailwind CSS,
                Framer-Motion, React-Email & Nodemailer,
                React-Intersection-Observer, and OutsideClick-React.
            </p>
        </footer>
    );
}