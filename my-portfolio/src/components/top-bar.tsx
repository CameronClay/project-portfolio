import React from 'react'

export default function TopBar({children} : {children: React.ReactNode}) {
    return (
        <div className="z-[999] fixed flex flex-col w-full p-[0.5rem] bg-zinc-700 dark:bg-zinc-900">
            {children}
        </div>
    )
}