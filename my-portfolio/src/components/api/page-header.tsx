import React from 'react';
import Link from 'next/link';
import { LINKS } from '@src/constants/api/section-data';
import PageHeaderTemplate from '@src/components/page-header-template';
import APIDropdown from '@src/components/api/api-dropdown';

export default function PageHeader() {
    return (
        <PageHeaderTemplate links={LINKS}>
            <Link
                href="/"
                target="_parent"
                className="flex items-center justify-center headerItemBase text-2xl dark:text-zinc-300 hover:text-red-600 dark:hover:text-red-800 bg-slate-400 dark:bg-slate-800 transition"
            >
                Home
            </Link>

            <APIDropdown />
        </PageHeaderTemplate>
    );
}
