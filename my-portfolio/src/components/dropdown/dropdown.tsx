'use client';

import Link from 'next/link';
import React from 'react';
import IsOpenContextProvider, {
    useIsOpenContext,
} from '@src/components/dropdown/isopen-context';
import { useOutsideClick } from 'outsideclick-react';
import { LinkTarget } from '@src/constants/components/constants';

type DropdownContainerProps = {
    classNameEtc?: string;
    toggleBtn: React.ReactNode;
    children: React.ReactNode;
};

export function DropdownContainer({
    toggleBtn,
    classNameEtc,
    children,
}: DropdownContainerProps) {
    const { isOpen, close } = useIsOpenContext();
    const handleOutsideClick = (e: HTMLElement) => {
        close();
    };
    const ref = useOutsideClick(handleOutsideClick);

    let className = '';
    if (classNameEtc) {
        className = `${className} ${classNameEtc}`;
    }

    return (
        <div ref={ref} className={className}>
            {
                //inline-block same as block but doesnt put the block element on a new line
            }
            <div className="relative inline-block">
                {toggleBtn}
                {isOpen && children}
            </div>
        </div>
    );
}

type DropdownButtonProps = {
    title?: string;
    classNameEtc?: string;
    children: React.ReactNode;
};

export function DropdownButton({
    classNameEtc,
    title,
    children,
}: DropdownButtonProps) {
    const { toggle } = useIsOpenContext();

    let className = 'inline-flex items-center justify-center headerItemBase';
    if (classNameEtc) {
        className = `${className} ${classNameEtc}`;
    }

    return (
        <button
            type="button"
            title={title}
            className={className}
            onClick={toggle}
        >
            {children}
            {/* 
                SVG (Scalable Vector Graphics) defines vector-based graphics in XML format. 
                Note: The xmlns attribute is only required on the outermost svg element of SVG documents, or inside HTML documents with XML serialization. It is unnecessary for inner svg elements or inside HTML documents with HTML serialization.
            */}
            {/* <svg className='w-[0.625rem] h-[0.625rem] ml-[0.625rem]' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 10 6'>
                <path stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m1 1 4 4 4-4' />
            </svg> */}
        </button>
    );
}

type DropdownItemProps = {
    id: string;
    href: string;
    target?: LinkTarget;
    onClick?: () => void;
    classNameEtc?: string;
    children: React.ReactNode;
};

export function DropdownItem({
    id,
    href,
    target = '_blank',
    onClick,
    classNameEtc,
    children,
}: DropdownItemProps) {
    const { close } = useIsOpenContext();

    let className = 'block px-[1rem] py-[0.5rem]';
    if (classNameEtc) {
        className = `${className} ${classNameEtc}`;
    }

    return (
        <li>
            <Link
                id={id}
                href={href}
                target={target}
                className={className}
                onClick={() => {
                    close();
                    onClick?.(); //call on click if not null (null coalescing)
                }}
            >
                {children}
            </Link>
        </li>
    );
}

type DropdownProps = {
    children: React.ReactNode;
};

export function Dropdown({ children }: DropdownProps) {
    return <IsOpenContextProvider>{children}</IsOpenContextProvider>;
}
