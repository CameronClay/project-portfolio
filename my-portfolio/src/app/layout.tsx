//everything in app directory is a server component by default
import { Inter } from 'next/font/google';

import '@src/app/globals.css';
import PageHeader from '@src/components/page-header';
import PageFooter from '@/src/components/page-footer';
import DarkMode from '@src/components/dark-mode';
import MyToaster from '@src/components/mytoaster';
import TopBar from '@src/components/top-bar';
import ContextProviderElement from '@src/context/context-provider-element';
import { CONTACT_INFO } from '@src/constants/contact-info'

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
            <body className={`${inter.className} relative`}>
                <ContextProviderElement>
                    <TopBar>
                        <PageHeader/>
                    </TopBar>
                    {
                        //cannot put margin on topbar because it has position fixed
                    }
                    <div className='bg-gray-50 text-gray-950 relative pt-[5rem] sm:pt-[6rem] dark:bg-zinc-800 dark:text-gray-50 dark:text-opacity-90'>
                        {
                        /* 
                            // two divs are for two different colors at the top of the page
                            // rounded-full makes it a circle

                            // absolute - Use absolute to position an element outside of the normal flow of the document, causing adjacent elements to be posiitioned as if the element doesn't exist.
                            // One spacing unit is equal to 0.25rem, which translates to 4px by default in common browsers.
                            // sm is a breakpoint which signifies small screens and larger [anything after sm: only applies on screens 640px and WIDER]
                            // md is a breakpoint which signifies medium screens and larger [anything after md: only applies on screens 768px and WIDER]
                            // lg is a breakpoint which signifies large screens and larger [anything after lg: only applies on screens 1024px and WIDER]
                            // xl is a breakpoint which signifies extra large screens and larger [anything after xl: only applies on screens 1280px and WIDER]
                            // 2xl is a breakpoint which signifies extra extra large screens and larger [anything after 2xl: only applies on screens 1536px and WIDER]
                            // -z-10 is a negative 10 z index [controls stack order of elements]

                            //Header element is for the header of the page, which is same for all pages
                            //Toaster element is for react-hot-toaster (alert display) 
                        */
                        }

                        {children}

                        <PageFooter/>
                        <MyToaster/>
                    </div>
                </ContextProviderElement>
            </body>
        </html>
    );
}