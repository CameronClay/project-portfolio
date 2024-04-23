'use client';

import ThemeContextProvider from '@src/context/home/theme-context';
import ActiveSectionContextProvider from '@src/context/home/active-section-context';
import { Section } from '@src/constants/api/section-data';

export default function ContextProviderElement({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ThemeContextProvider>
            <ActiveSectionContextProvider defaultSection={Section.INFO}>
                {children}
            </ActiveSectionContextProvider>
        </ThemeContextProvider>
    );
}
