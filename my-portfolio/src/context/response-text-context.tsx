'use client';

import React, { useState, createContext, useContext } from 'react';

type ResponseTextContextProviderProps = {
    children: React.ReactNode;
};

type ResponseTextContextType = {
    response_text: string;
    set_response_text: React.Dispatch<React.SetStateAction<string>>;
    response_text_error: string;
    set_response_text_error: React.Dispatch<React.SetStateAction<string>>;
};

const ResponseTextContext = createContext<ResponseTextContextType | null>(null);

//global react element that holds the state info
export default function ResponseTextContextProvider({
    children,
}: ResponseTextContextProviderProps) {
    const [response_text, set_response_text] = useState('');
    const [response_text_error, set_response_text_error] = useState('');

    return (
        <ResponseTextContext.Provider
            value={{
                //first set of curly braces is so you can use javascript, second set is to denote an object
                response_text,
                set_response_text,
                response_text_error,
                set_response_text_error,
            }}
        >
            {children}
        </ResponseTextContext.Provider>
    );
}

//custom hook (hooks are functions that start with use keyword)
export function useResponseTextContext() {
    const context = useContext(ResponseTextContext);

    if (context === null) {
        const error = new Error();
        error.message = `${useResponseTextContext.name} must be used within an ${ResponseTextContextProvider.name}. Trace: ${error.stack}`;
        throw error;
    }

    return context;
}