import ThemeContextProvider from '@src/context/theme-context';
import ActiveSectionContextProvider from '@src/context/active-section-context';

export default function ContextProviderElement({children} : {children: React.ReactNode}) {
    return (
        <ThemeContextProvider>
            <ActiveSectionContextProvider>
                {children}
            </ActiveSectionContextProvider>
        </ThemeContextProvider>
    )
}