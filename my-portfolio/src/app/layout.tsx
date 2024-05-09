//everything in app directory is a server component by default
import React from 'react';
import { Inter } from 'next/font/google';

import '@src/app/globals.css';

import { CONTACT_INFO } from '@src/constants/home/contact-info';
import MainLayout from '@src/layouts/main-layout';

// choose font
const inter = Inter({ subsets: ['latin'] });

// Needed to show info in tab
// favicon.ico is the tab icon
export const metadata = {
    title: `${CONTACT_INFO.name}'s Portfolio`,
    description: `${CONTACT_INFO.name} is a software developer.`,
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    //! denotes an important rule in css, it will override ALL previous styling rules for that specific property on that element
    return (
        <React.StrictMode>
            <html lang="en" className="!scroll-smooth">
                <head>
                    {
                        //prevent page flicker with server side rendering due to dark mode
                    }
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                            try {
                                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                                    document.documentElement.classList.add('dark')
                                } else {
                                    document.documentElement.classList.remove('dark')
                                }
                            } catch (_) {}
                        `,
                        }}
                    />

                    {/* Other Meta Tags, Links, Etc... */}
                </head>
                <body className={`${inter.className}`}>
                    <MainLayout>{children}</MainLayout>
                </body>
            </html>
        </React.StrictMode>
    );
}