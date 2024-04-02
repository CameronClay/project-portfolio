'use client';

import React, { useState, createContext, useContext } from 'react';

type APIEndpointContextProviderProps = {
    children: React.ReactNode;
};

type APIEndpointContextType = {
    response_text: string;
    set_response_text: React.Dispatch<React.SetStateAction<string>>;
};

const APIEndpointContext =
    createContext<APIEndpointContextType | null>(null);

//global react element that holds the state info
export default function APIEndpointContextProvider({
    children,
}: APIEndpointContextProviderProps) {
    const [response_text, set_response_text] = useState('');

    return (
        <APIEndpointContext.Provider
            value={{ //first set of curly braces is so you can use javascript, second set is to denote an object
                response_text,
                set_response_text,
            }}
        >
            {children}
        </APIEndpointContext.Provider>
    );
}

//custom hook (hooks are functions that start with use keyword)
export function useResponseTextContext() {
    const context = useContext(APIEndpointContext);

    if (context === null) {
        let error = new Error();
        error.message =`${useResponseTextContext.name} must be used within an ${APIEndpointContextProvider.name}. Trace: ${error.stack}`;
        throw error;
    }

    return context;
}