import React from 'react';

type SectionHeadingProps = {
    children: React.ReactNode;
};

export default function SectionHeading({ children }: SectionHeadingProps) {
    return (
        <h2 className="text-4xl font-medium capitalize mb-[2rem] text-center">
            {children}
        </h2>
    );
}