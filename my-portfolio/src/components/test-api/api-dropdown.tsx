import React from 'react';
import { Dropdown, DropdownButton, DropdownContainer, DropdownItemsList, DropdownItem } from '@src/components/dropdown/dropdown';
import { MdKeyboardArrowDown } from 'react-icons/md';

export default function APIDropdown() {
    return (
        <Dropdown>
            <DropdownContainer 
                toggleBtn={
                    <DropdownButton
                        title='Test API'
                        classNameEtc='w-[6rem] h-[3.5rem] text-2xl dark:text-zinc-300 hover:text-red-400 dark:hover:text-red-800 bg-slate-400 dark:bg-slate-800'
                    >
                        API
                        <MdKeyboardArrowDown size={24}/>
                    </DropdownButton>
                }
                classNameEtc='pl-[0.5rem] pr-[0.25rem]'
            >
                <DropdownItemsList 
                    classNameEtc='w-[10rem] text-lg bg-zinc-100 dark:bg-zinc-800'
                >
                    <DropdownItem 
                        href='/test-api'
                        target='_parent'
                        classNameEtc='text-2xl h-full dark:text-zinc-300 hover:text-red-400 dark:hover:text-red-800'
                    >
                        Test API
                    </DropdownItem>
                </DropdownItemsList>
            </DropdownContainer>
        </Dropdown>    
    )
}
