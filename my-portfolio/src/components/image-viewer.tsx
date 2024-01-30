'use client';

import React, { useCallback, useEffect, useRef } from 'react';
import { IoMdClose } from 'react-icons/io';
import { useImageViewerContext } from '@src/context/image-viewer-context'
import { useOutsideClick } from 'outsideclick-react';
import { useScroll, useTransform } from 'framer-motion';

export default function ImageViewer() {
    const imageViewerContext = useImageViewerContext();
    
    const close = () => {
        imageViewerContext.setVisible(false);
    };

    //make click outside of element close it
    const handleOutsideClick = (e : HTMLElement) => {
        close();
    }
    const ref = useOutsideClick(handleOutsideClick);
    const imageRef = useRef<HTMLImageElement>(null);

    //disable page scroll when element is visible
    useEffect(() => {
        if (imageViewerContext.isVisible) {
            document.body.style.overflow = 'hidden';
        } 
        else {
            document.body.style.overflow = 'scroll';
        }
    }, [imageViewerContext.isVisible]);

    // const { scrollY } = useScroll({
    //     target: ref,
    // });
    // const scaleProgress = useTransform(scrollY, [0, 1], [0.8, 1]);

    // const onUpdate = useCallback(() => {
    //     if (imageRef.current) {
    //         imageRef.current.style.transform = `scale(${scaleProgress})`;
    //     }
    // }, [scaleProgress]);

    return (
        <div
            ref={ref}
            className=''
        >
            {imageViewerContext.isVisible && (
                <div
                    className='fixed flex left-1/2 flex-col items-center justify-center -translate-x-1/2 z-50 bg-black'
                >
                    <div
                        className='flex flex-row items-center justify-start w-full h-[1rem] sm:h-[2rem] bg-gray-700 mb-[1rem] mx-[1rem]'
                    >
                        <div className='text-nowrap mx-[0.25rem] my-[0rem] sm:mx-[0.5rem]'>
                            <p className='text-2xl font-bold text-white text-opacity-85 dark:text-opacity-70'>
                                Image Viewer
                            </p>
                        </div>

                        <div
                            className='flex justify-end w-full pl-[0.25rem]'
                        >
                            <button
                                title='Close Image Viewer'
                                onClick={close}
                                className='flex items-center justify-center w-[2rem] h-[2rem] top-[0.5rem] text-gray-900 hover:bg-gray-400'
                            >
                                <IoMdClose size={24}/>
                            </button>
                        </div>
                    </div>


                    <img
                        ref={imageRef}
                        src={imageViewerContext.imageSrc}
                        alt={imageViewerContext.imageAlt}
                        fetchPriority='high'
                        className='px-[1rem] pb-[1rem]'
                    >
                        
                    </img>
                </div>
            )}
        </div>
    )
}
