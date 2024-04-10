//everything in app directory is a server component by default
import React from 'react';
import { Inter } from 'next/font/google';

import '@src/app/globals.css';

import { CONTACT_INFO } from '@src/constants/home/contact-info'
import PageContainer from '@src/components/home/page-container';
import PageFooter from '@src/components/page-footer';
import MyToaster from '@src/components/mytoaster';

// choose font
const inter = Inter({ subsets: ['latin'] });

// Needed to show info in tab
// favicon.ico is the tab icon
export const metadata = {
    title      : `${CONTACT_INFO.name}'s Portfolio`,
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
            <html lang='en' className='!scroll-smooth'>
                <body className={`${inter.className}`}>
                    <PageContainer>
                        {children}

                        <PageFooter/>
                        <MyToaster/>
                    </PageContainer>
                </body>
            </html>
        </React.StrictMode>
    );
}