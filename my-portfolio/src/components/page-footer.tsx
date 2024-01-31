import React from 'react';
import { CONTACT_INFO } from '@src/constants/home/contact-info';

export default function PageFooter() {
    return (
        <footer className='pb-[1.75rem] px-[1rem] text-center text-gray-700 dark:text-gray-300'>
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
                Framer Motion, Resend & nodemailer,
                React Intersection Observer, and OutsideClick React.
            </p>
        </footer>
    );
}