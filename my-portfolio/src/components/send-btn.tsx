import React from 'react';
import { SiMinutemailer } from 'react-icons/si';
import { useFormStatus } from 'react-dom';

export default function SendBtn() {
    const { pending } = useFormStatus(); //this hook must be 1 scope deeper than contact form

    //text here is a flex item
    //items-center alligns vertically
    //justify-center alligns horizontally
    return (
        <button
            title='Send Email'
            type='submit'
            disabled={pending}
            className='select-none group flex items-center justify-center mt-[0.5rem] gap-[0.5rem] h-[3rem] w-[8rem] bg-slate-900 text-white border-[0.125rem] border-slate-600/100 dark:border-slate-200/10 rounded-full outline-none transition-all focus:scale-110 hover:scale-[112%] hover:bg-gray-950 active:scale-[108%] disabled:scale-100 disabled:bg-opacity-65 dark:bg-slate-700'
        > 

        {
            pending ? 
                <div className='h-[1.25rem] w-[1.25rem] animate-spin'/> : 
            (
                <div className='flex items-center justify-center text-lg opacity-90'>
                    Send <SiMinutemailer size={18} className='w-full h-full pl-[0.5rem]'/>
                </div>
            )
        }

        </button>
    )
}
