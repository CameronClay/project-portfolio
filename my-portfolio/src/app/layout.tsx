//everything in app directory is a server component by default
import { Inter } from 'next/font/google';

import '@src/app/globals.css';
import { CONTACT_INFO } from '@src/constants/home/contact-info'

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
    params,
}: {
    children: React.ReactNode;
    params: { //root component has empty params (not needed)
        tag: string
        item: string
    };
}) {
    //! denotes an important rule in css, it will override ALL previous styling rules for that specific property on that element
    return (
        <html lang='en' className='!scroll-smooth'>
            <body className={`${inter.className}`}>
                {children}
            </body>
        </html>
    );
}