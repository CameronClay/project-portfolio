import React from 'react';
import { SiMinutemailer } from 'react-icons/si';
import { useFormStatus } from 'react-dom';

type SubmitBtnProps = {
    text: string;
};

export default function SubmitBtn({ text }: SubmitBtnProps) {
    const { pending } = useFormStatus(); //this hook must be 1 scope deeper than form since useFormStatus hook is only valid inside a form element

    //text here is a flex item
    //items-center alligns vertically
    //justify-center alligns horizontally
    return (
        <button
            title={text}
            type="submit"
            disabled={pending}
            className="select-none group flex items-center justify-center mb-[0.5rem] gap-[0.5rem] h-[3rem] sm:w-[11rem] px-[0.75rem] sm:px-[0rem] bg-slate-900 text-white border-[0.125rem] border-slate-600/100 dark:border-slate-200/10 rounded-full outline-none transition-all focus:scale-110 hover:scale-[112%] hover:bg-gray-950 active:scale-[108%] disabled:scale-100 disabled:bg-opacity-65 dark:bg-slate-700"
        >
            {pending ? (
                <div
                    className="animate-spin inline-block size-[1.5rem] border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
                    role="status"
                    aria-label="loading"
                />
            ) : (
                <div className="flex items-center justify-center text-lg opacity-90">
                    {text}{' '}
                    <SiMinutemailer size={18} className="h-full pl-[0.5rem]" />
                </div>
            )}
        </button>
    );
}
