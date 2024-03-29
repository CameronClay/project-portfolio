import React from 'react';

import PageFooter from '@src/components/page-footer';
import MyToaster from '@src/components/mytoaster';
import TopBar from '@src/components/top-bar';
import PageHeader from '@/src/components/api/page-header';
import ContextProviderElement from '@src/context/test-api/context-provider-element';
import PageContainer from '@src/components/api/page-container';
import SectionContainer from '@src/components/api/section-container';
import MyAPI from '@src/components/api/sections/api';
import APIInfo from '@src/components/api/sections/api-info';

export default function API() {
    return (
        <ContextProviderElement>
            <PageContainer>
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

                <TopBar>
                    <PageHeader/>
                </TopBar>

                <SectionContainer>
                    <APIInfo/>
                    <MyAPI/>
                    {/* <div className='h-[100rem]'>
                    </div> */}
                </SectionContainer>

                <PageFooter/>

                <MyToaster/>
            </PageContainer>
        </ContextProviderElement>
    )
}
