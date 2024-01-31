// 'use client';

import React from 'react';
import clsx from 'clsx'; //clsxx helps with conditionally applying classes

// import { useImageViewerContext } from '@src/context/image-viewer-context';

export default function PageContainer({ children }: { children: React.ReactNode }) {
    // const imageViewerContext = useImageViewerContext();
    return (
        // <div className={clsx(
        //     'bg-gray-50 text-gray-950 relative dark:bg-zinc-800 dark:text-gray-50 dark:text-opacity-90',
        //     {
        //         'select-none':
        //             imageViewerContext.isVisible,
        //     }
        // )}>
        <div 
            className='bg-gray-50 text-gray-950 relative dark:bg-zinc-800 dark:text-gray-50 dark:text-opacity-90'
        >
            {children}
        </div>
    )
}
