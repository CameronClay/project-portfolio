import React from 'react';
import Link from 'next/link';
import { LinkTarget } from '@src/constants/components/constants';

type InfoBtnProps = {
    title?: string;
    href: string;
    target?: LinkTarget;
    download?: boolean;
    onClick?: () => void;
    classNameEtc?: string;
    children: React.ReactNode;
};

export function InfoBtn({href, title, target = '_parent', download = false, onClick, classNameEtc, children}: InfoBtnProps) {
  return (           
        <Link
            title={title}
            className={`select-none flex items-center gap-[0.5rem] outline-none px-[1.75rem] py-[0.75rem] focus:scale-110 hover:scale-110 active:scale-105 cursor-pointer borderBlack bg-white dark:bg-zinc-700 transition ${classNameEtc}`}
            href={href}
            download={download}
            onClick={onClick}
            target={target}
        >
            {children}
        </Link>
    )
}

export function InfoBtnBasic({href, title, target = '_blank', download = false, onClick, classNameEtc, children}: InfoBtnProps)
{
    return (
            //next/link only creates an a tag (important for Search Engine Optimization (SEO)) if a string componenet is passed in for children
        <a 
            title={title}
            className={`select-none flex items-center gap-[0.5rem] outline-none focus:scale-[1.15] hover:scale-[1.15] active:scale-105 cursor-pointer transition $bg-white p-[1rem] borderBlack text-gray-700 hover:text-gray-950 dark:bg-zinc-700 dark:text-white/60 {classNameEtc}`}
            href={href}
            download={download}
            onClick={onClick}
            target={target}
        >
            {children}
        </a>
    )
}