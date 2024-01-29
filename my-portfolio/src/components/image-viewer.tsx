'use client';

import React from 'react';
import Image from 'next/image';
import { IoMdClose } from 'react-icons/io';
import { useImageViewerContext } from '@src/context/image-viewer-context'

export default function ImageViewer() {
    const {isVisible, setVisible, imageSrc, imageAlt} = useImageViewerContext();
    
    const close = () => {
        setVisible(false);
    };

    return (
        <div
            className='w-[30rem] h-[30rem] border-black/10 border-[0.125rem] bg-black'
        >
            {isVisible && (
                <div
                    className=''
                >
                    <button
                        title='Close Image Viewer'
                        onClick={close}
                        className=''
                    >
                        <IoMdClose/>
                    </button>

                    <Image
                        src={imageSrc}
                        alt={imageAlt}
                        width={500}
                        height={500}
                        className=''
                    >
                        
                    </Image>
                </div>
            )}
        </div>
    )
}
