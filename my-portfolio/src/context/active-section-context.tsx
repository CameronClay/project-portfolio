'use client';

import { Section } from '@src/constants/section-data';
import React, { useState, createContext, useContext } from 'react';

type ActiveSectionContextProviderProps = {
    children: React.ReactNode;
};

type ActiveSectionContextType = {
    activeSection: Section;
    setActiveSection: React.Dispatch<React.SetStateAction<Section>>;
    timeOfLastClick: number;
    setTimeOfLastClick: React.Dispatch<React.SetStateAction<number>>; //used to disable the inView check for each section temporarily when a user clicks on a button in the header
};

//global section context needed for ActiveSectionContextProvider function
const ActiveSectionContext =
    createContext<ActiveSectionContextType | null>(null);

//global react element that holds the state info
export default function ActiveSectionContextProvider({
    children,
}: ActiveSectionContextProviderProps) {
    const [activeSection, setActiveSection] = useState<Section>(Section.HOME);
    const [timeOfLastClick, setTimeOfLastClick] = useState(0); // keep track of this to disable the page-header background animation temporarily when user clicks on a link

    return (
        <ActiveSectionContext.Provider
            value={{ //first set of curly braces is so you can use javascript, second set is to denote an object
                activeSection,
                setActiveSection,
                timeOfLastClick,
                setTimeOfLastClick,
            }}
        >
            {children}
        </ActiveSectionContext.Provider>
    );
}

//custom hook (hooks are functions that start with use keyword)
export function useActiveSectionContext() {
    const context = useContext(ActiveSectionContext);

    if (context === null) {
        throw new Error(
            `${useActiveSectionContext.name} must be used within an ${ActiveSectionContextProvider.name}`
        );
    }

    return context;
}