'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useImageViewerContext } from '@src/context/image-viewer-context';
import { PROJECTS_DATA } from '@src/constants/home/section-data';

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
    const imageViewerContext = useImageViewerContext();

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
            <section className='max-w-[42rem] border border-black/5 rounded-lg overflow-hidden sm:pr-[2rem] relative sm:h-[22.5rem] bg-gray-100 hover:bg-gray-200 transition dark:text-white dark:bg-white/[10%] dark:hover:bg-white/[15%]'>
                <div className='flex flex-col h-full pt-[1rem] pb-[1.75rem] px-[1.25rem] sm:pl-[2.5rem] sm:pr-[0.5rem] sm:pt-[2.5rem] sm:max-w-[60%]'>
                    <h3 className='text-2xl font-semibold'>{title}</h3>
                    {
                        //whitespace-pre-line displays \n as a line break instead of as plain text
                    }
                    <p className='mt-[0.5rem] leading-relaxed text-gray-700 dark:text-white/70 whitespace-pre-line'>{description}</p>

                    {
                        //mt-auto (auto means browser can select a suitable value)
                    }
                    <ul className='flex flex-wrap mt-[1rem] gap-[0.5rem] sm:mt-auto'>
                        {
                            tags.map((tag, index) => (
                                <li className='bg-black/[0.7] px-[0.75rem] py-[0.26rem] text-[0.7rem] uppercase tracking-wider rounded-full text-white dark:text-white/70 border-[0.125rem] border-gray-900  dark:border-white/40' key={index}>{tag}</li>
                            ))
                        }
                    </ul>
                </div>     

                {
                    //absolute position so list of skills can be at the bottom of the image
                }
                {/* <Link 
                    href={fullImageUrl} 
                    target='_blank' 
                    title='Click to open full image' 
                    className='absolute w-full h-full top-[2rem] sm:-right-[7rem] sm:h-[auto] sm:max-w-[22.5rem]
                            transition

                            sm:hover:scale-[1.25]
                            sm:hover:-translate-x-[45%]'
                > */}
                <button
                    className='absolute w-full h-full top-[2rem] sm:-right-[7rem] sm:h-[auto] sm:max-w-[22.5rem]
                            transition

                            sm:hover:scale-[1.25]
                            sm:hover:-translate-x-[45%]'
                    onClick={()=> {
                        imageViewerContext.setImageAlt(title);
                        imageViewerContext.setImageSrc(fullImageUrl);
                        imageViewerContext.setVisible(true);
                    }}
                >
                    <img
                        title='Click to open full image'
                        src={previewImageUrl}
                        alt={`Project ${title}`}
                        fetchPriority='high'
                        className='hidden sm:block w-full h-full py-[1rem]'
                        tabIndex={0}
                    />
                </button>  
            </section>
        </motion.div>
    )
}
