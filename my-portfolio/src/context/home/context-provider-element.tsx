'use client';

import ThemeContextProvider from '@src/context/theme-context';
import ActiveSectionContextProvider from '@src/context/active-section-context';
import ImageViewerContextProvider from '@src/context/image-viewer-context'
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