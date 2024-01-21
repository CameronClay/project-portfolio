'use client';

import React, { useEffect, useState, createContext, useContext } from 'react';

const THEME_KEY = 'theme';
enum Theme {
    LIGHT = 'light',
    DARK    = 'dark',
}

type ThemeContextInfo = {
    theme: Theme;
    toggleTheme: () => void;
};

//global section context needed for ActiveSectionContextProvider function
const ThemeContext = createContext<ThemeContextInfo | null>(null);

type ThemeContextProviderProps = {
    children: React.ReactNode;
};

//global react element that holds the state info
export default function ThemeContextProvider({
    children,
}: ThemeContextProviderProps) {
    const [theme, setTheme] = useState<Theme>(Theme.LIGHT);

    const setThemeState = (theme : Theme) => {
        setTheme(theme);
        window.localStorage.setItem(THEME_KEY, theme);

        if (theme === Theme.DARK) {
            document.documentElement.classList.add(Theme.DARK);
        }
        else {
            if(document.documentElement.classList.contains(Theme.DARK)) {
                document.documentElement.classList.remove(Theme.DARK);
            }
        }
    };

    const toggleTheme = () => {
        const newTheme = theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
        setThemeState(newTheme);
    };

    useEffect(() => {
        let localTheme = window.localStorage.getItem(THEME_KEY) as Theme | null;

        if (!localTheme) {
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) { //query dark theme status of user's OS
                localTheme = Theme.DARK;
            }
            else {
                localTheme = Theme.LIGHT;
            }
        }
        
        setThemeState(localTheme);
    }, []);

    return (
        <ThemeContext.Provider
            value={{
                theme,
                toggleTheme,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}

//custom hook (hooks are functions that start with use keyword)
export function useTheme() {
    const context = useContext(ThemeContext);

    if (context === null) {
        throw new Error(`${useTheme.name} must be used within an ${ThemeContextProvider.name}`);
    }

    return context;
}