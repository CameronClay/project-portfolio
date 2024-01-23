'use client';

import React, { useState, createContext, useContext } from 'react';

type IsOpenContextProviderProps = {
    children: React.ReactNode;
};

type IsOpenContextType = {
    isOpen   : boolean;
    toggle   : () => void;
    close    : () => void;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

//global section context needed for IsOpenContextProvider function
const IsOpenContext =
    createContext<IsOpenContextType | null>(null);

//global react element that holds the state info
export default function IsOpenContextProvider({
    children,
}: IsOpenContextProviderProps) {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    const close = () => {
        setIsOpen(false);
    };

    return (
        <IsOpenContext.Provider
            value={{ //first set of curly braces is so you can use javascript, second set is to denote an object
                toggle,
                close,
                isOpen,
                setIsOpen
            }}
        >
            {children}
        </IsOpenContext.Provider>
    );
}

//custom hook (hooks are functions that start with use keyword)
export function useIsOpenContext() {
    const context = useContext(IsOpenContext);

    if (context === null) {
        throw new Error(
            `${useIsOpenContext.name} must be used within an ${IsOpenContextProvider.name}`
        );
    }

    return context;
}