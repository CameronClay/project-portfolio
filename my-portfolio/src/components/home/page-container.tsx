import React from 'react';

export default function PageContainer({
    children,
}: {
    children: React.ReactNode;
}) {
    return <div className="relative pageContainerColor">{children}</div>;
}
