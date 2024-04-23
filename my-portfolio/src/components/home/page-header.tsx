'use client';

import React from 'react';
import { LINKS } from '@src/constants/home/section-data';
import APIDropdown from '@src/components/api/api-dropdown';
import PageHeaderTemplate from '@src/components/page-header-template';

export default function PageHeader() {
    return (
        <PageHeaderTemplate links={LINKS}>
            <APIDropdown />
        </PageHeaderTemplate>
    );
}
