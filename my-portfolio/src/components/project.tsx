'use client';

import { useRef } from 'react';
import { PROJECTS_DATA } from '@src/constants/section-data';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';

type ProjectProps = (typeof PROJECTS_DATA)[number];

export default function Project({
    title,
    description,
    tags,
    previewImageUrl,
    fullImageUrl
} : ProjectProps) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['0 1', '1.33 1'] //start when bottom of viewport reaches top of target, end when bottom of viewport has gone 33% past the project
    });
    const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
    const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

    //tracking-wider changes text spacing
    //leading-relaxed modifies the line height
    return (
        //div element needed because animating the section is not smooth for some reason
        <motion.div
            ref={ref} 
            style={{
                scale: scaleProgress,
                opacity: opacityProgress
            }}
            className='group mb-[0.75rem] sm:mb-[2rem] last:mb-[0rem]'
        >
            <section className='bg-gray-100 max-w-[42rem] border border-black/5 rounded-lg overflow-hidden sm:pr-[2rem] relative sm:h-[25rem] hover:bg-gray-200 transition dark:text-white dark:bg-white/[10%] dark:hover:bg-white-20'>
                <div className='pt-[1rem] pb-[1.75rem] px-[1.25rem] sm:pl-[2.5rem] sm:pr-[0.5rem] sm:pt-[2.5rem] sm:max-w-[50%] flex flex-col h-full'>
                    <h3 className='text-2xl font-semibold'>{title}</h3>
                    {
                        //whitespace-pre-line displays \n as aline break instead of as plain text
                    }
                    <p className='mt-[0.5rem] leading-relaxed text-gray-700 dark:text-white/70 whitespace-pre-line'>{description}</p>

                    {
                        //mt-auto (auto means browser can select a suitable value)
                    }
                    <ul className='flex flex-wrap mt-[1rem] gap-[0.5rem] sm:mt-auto'>
                        {
                            tags.map((tag, index) => (
                                <li className='bg-black/[0.7] px-[0.75rem] py-[0.26rem] text-[0.7rem] uppercase tracking-wider rounded-full text-white dark:text-white/70' key={index}>{tag}</li>
                            ))
                        }
                    </ul>
                </div>     

                {
                    //absolute position so list of skills can be at the bottom of the image
                }
                <Link href={fullImageUrl} target='_blank' title="Click to open full image">
                    <img
                        src={previewImageUrl}
                        alt={`Project ${title}`}
                        fetchPriority='high'
                        className='absolute hidden sm:block top-[2rem] -right-[10rem] w-[28.25rem] rounded-t-lg shadow-2xl
                            transition

                            hover:scale-[1.2]
                            hover:-translate-x-[47%]'
                    />
                </Link>  
            </section>
        </motion.div>
    )
}
