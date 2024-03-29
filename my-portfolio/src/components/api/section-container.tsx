import React from 'react';

export default function SectionContainer({ children }: { children: React.ReactNode }) {
    return (
        <main className='min-h-[calc(100vh-10rem)] flex flex-col px-[1rem]'>
            {children}
        </main>
    )
}
