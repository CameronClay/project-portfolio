import React from 'react';
import Link from 'next/link';
import PageHeaderTemplate from '@src//components/page/page-header-template';
import APIDropdown from '@src//components/api/api-dropdown';

export default function PageHeader() {
    return (
        <PageHeaderTemplate links={[]}>
            <Link
                href="/"
                target="_parent"
                className="flex items-center justify-center headerItemBase dark:text-zinc-300 hover:text-red-600 dark:hover:text-red-800 bg-slate-400 dark:bg-slate-800 transition"
            >
                Home
            </Link>

            <APIDropdown />
        </PageHeaderTemplate>
    );
}
