'use client';

import ThemeContextProvider from '@src/context/home/theme-context';
import ActiveSectionContextProvider from '@src/context/home/active-section-context';
import ImageViewerContextProvider from '@src/context/home/image-viewer-context'
import { Section } from '@src/constants/home/section-data';

export default function ContextProviderElement({children} : {children: React.ReactNode}) {
    return (
        <ThemeContextProvider>
            <ImageViewerContextProvider>
                <ActiveSectionContextProvider defaultSection={Section.INFO}>
                    {children}
                </ActiveSectionContextProvider>
            </ImageViewerContextProvider>
        </ThemeContextProvider>
    )
}