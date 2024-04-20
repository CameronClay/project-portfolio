'use client';

import { useTheme } from '@src/context/home/theme-context';
import React from 'react';
import { CiLight, CiDark } from 'react-icons/ci';
import { Theme } from '@src/context/home/theme-context';

export default function DarkMode() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            title='Dark Mode Toggle'
            className='select-none flex w-full h-full items-center justify-center transition-all rounded-full text-black dark:text-white hover:bg-slate-400 dark:hover:bg-slate-900 border bg-slate-200 dark:bg-slate-600 border-black/100 dark:border-white/40 bg-opacity-80 dark:bg-opacity-75'
            onClick={toggleTheme}
        >
            <div className='flex items-center justify-center w-[75%] h-[75%]'>
                {theme === Theme.LIGHT ? <CiLight size={35}/> : <CiDark size={35}/>}
            </div>
        </button>  
    );
}