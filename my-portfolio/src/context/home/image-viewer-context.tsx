'use client';

import React, { useState, createContext, useContext } from 'react';

type ImageViewerContextProviderProps = {
    children: React.ReactNode;
};

type ImageViewerContextType = {
    isVisible: boolean;
    setVisible: (isVisible: boolean) => void;
    imageSrc: string;
    setImageSrc: (imageSrc: string) => void;
    imageAlt: string;
    setImageAlt: (isVisible: string) => void;
};

const ImageViewerContext = createContext<ImageViewerContextType | null>(null);

//global react element that holds the state info
export default function ImageViewerContextProvider({
    children,
}: ImageViewerContextProviderProps) {
    const [isVisible, setVisible] = useState(false);
    const [imageSrc, setImageSrc] = useState('');
    const [imageAlt, setImageAlt] = useState('');

    return (
        <ImageViewerContext.Provider
            value={{
                //first set of curly braces is so you can use javascript, second set is to denote an object
                isVisible,
                setVisible,
                imageSrc,
                setImageSrc,
                imageAlt,
                setImageAlt,
            }}
        >
            {children}
        </ImageViewerContext.Provider>
    );
}

//custom hook (hooks are functions that start with use keyword)
export function useImageViewerContext() {
    const context = useContext(ImageViewerContext);

    if (context === null) {
        const error = new Error();
        error.message = `${useImageViewerContext.name} must be used within an ${ImageViewerContextProvider.name}. Trace: ${error.stack}`;
        throw error;
    }

    return context;
}