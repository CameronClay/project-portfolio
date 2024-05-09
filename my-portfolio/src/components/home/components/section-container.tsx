import React from 'react';

export default function SectionContainer({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="min-h-[calc(100vh-10rem)] flex flex-col items-center justify-start pl-[1rem] pr-[1rem]">
            {children}
        </main>
    );
}