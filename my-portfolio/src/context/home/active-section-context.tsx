'use client';

import React, { useState, createContext, useContext } from 'react';

type ActiveSectionContextProviderProps = {
    defaultSection: string;
    children: React.ReactNode;
};

type ActiveSectionContextType = {
    activeSection: string;
    setActiveSection: React.Dispatch<React.SetStateAction<string>>;
    timeOfLastClick: number;
    setTimeOfLastClick: React.Dispatch<React.SetStateAction<number>>; //used to disable the inView check for each section temporarily when a user clicks on a button in the header
};

const ActiveSectionContext = createContext<ActiveSectionContextType | null>(
    null
);

//global react element that holds the state info
export default function ActiveSectionContextProvider({
    defaultSection,
    children,
}: ActiveSectionContextProviderProps) {
    const [activeSection, setActiveSection] = useState<string>(defaultSection);
    const [timeOfLastClick, setTimeOfLastClick] = useState(0); // keep track of this to disable the page-header background animation temporarily when user clicks on a link

    return (
        <ActiveSectionContext.Provider
            value={{
                //first set of curly braces is so you can use javascript, second set is to denote an object
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
        const error = new Error();
        error.message = `${useActiveSectionContext.name} must be used within an ${ActiveSectionContextProvider.name}. Trace: ${error.stack}`;
        throw error;
    }

    return context;
}
