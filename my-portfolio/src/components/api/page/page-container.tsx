import React from 'react';

export default function PageContainer({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="bg-gray-50 text-gray-950 relative dark:bg-zinc-800 dark:text-gray-50 dark:text-opacity-90">
            {children}
        </div>
    );
}