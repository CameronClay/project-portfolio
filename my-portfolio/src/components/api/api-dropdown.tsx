import React from 'react';
import {
    Dropdown,
    DropdownButton,
    DropdownContainer,
    DropdownItem,
} from '@src/components/dropdown/dropdown';
import { DropdownItemsList } from '@src/components/dropdown/dropdown-itemslist';
import { MdKeyboardArrowDown } from 'react-icons/md';

export default function APIDropdown() {
    return (
        <Dropdown>
            <DropdownContainer
                toggleBtn={
                    <DropdownButton
                        title="Test API"
                        classNameEtc="h-[3.25rem] text-2xl dark:text-zinc-300 hover:text-red-600 dark:hover:text-red-800 bg-slate-400 dark:bg-slate-800 transition"
                    >
                        API
                        <MdKeyboardArrowDown size={24} />
                    </DropdownButton>
                }
                classNameEtc=""
            >
                <DropdownItemsList classNameEtc="w-[10rem] text-lg bg-zinc-100 dark:bg-zinc-800">
                    <DropdownItem
                        id="public-api"
                        href="/api-info/public"
                        target="_parent"
                        classNameEtc="dropdownItem"
                    >
                        Public API
                    </DropdownItem>

                    <DropdownItem
                        id="admin-api"
                        href="/api-info/admin"
                        target="_parent"
                        classNameEtc="dropdownItem"
                    >
                        Admin API
                    </DropdownItem>
                </DropdownItemsList>
            </DropdownContainer>
        </Dropdown>
    );
}
