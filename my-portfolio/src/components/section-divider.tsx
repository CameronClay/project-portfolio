'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function SectionDivider() {
    //Use hidden to set an element to display: none and remove it from the page layout
    //Using the property display: block will put the element on its own line and fill its parent.
    return (
        <motion.div className='bg-gray-200 my-[3rem] h-[3.5rem] w-[0.25rem] rounded-full hidden sm:block dark:bg-opacity-20'
            initial={{opacity: 0, y: 100}}
            animate={{opacity: 1, y: 0}}
            transition={{
                delay: 0.130 //stagger delay
            }}
        />
    )
}