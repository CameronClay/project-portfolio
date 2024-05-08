import React from 'react';

export default function TopBar({ children }: { children: React.ReactNode }) {
    //sticky is like fixed but doesn't remove it from the flow of the document
    return (
        <div className="z-[999] sticky top-0 flex flex-col w-full p-[0.5rem] bg-zinc-700 dark:bg-zinc-900 mb-[1.75rem] sm:mb-[2rem]">
            {children}
        </div>
    );
}
