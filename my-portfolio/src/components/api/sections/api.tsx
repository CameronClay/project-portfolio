'use client';

import React from 'react';
import { Section } from '@src/constants/api/section-data';
import { useSectionInView } from '@src/lib/hooks';

export default function MyAPI() {
    const { ref } = useSectionInView(Section.API, 0.5);

    return (
        <section
            id='api'
            ref={ref}
            className='scroll-mt-[5rem]'
        >
            <p className='text-2xl font-bold px-[0.125rem]'>
                API
            </p>

            <div className='flex flex-col justify-start m-[0.5rem] border-[0.125rem] p-[0.5rem] borderBlack100'>
                <div className='flex flex-row justify-start'>
                    <p className='text-2xl text-red-500 font-bold'>
                        POST
                    </p>
                    <p className='flex flex-wrap justify-end w-full text-2xl'>
                        /api/login
                    </p>
                </div>

                <hr className='mt-[0.5rem] mb-[1rem] bg-white dark:bg-black'/>

                <p className='mb-[1rem]'>
                    Parameters (<span className='font-bold'>*</span> Indicates required):
                </p>
                <div className='flex flex-row'>
                    <ul className='flex flex-col justify-start'>
                        <li className='flex flexrow'>
                            <p className='mr-[2rem] text-nowrap'>
                                username: String (*)
                            </p>

                            <input 
                                name='inputUsername'
                                type='text'
                                required={true}
                                maxLength={80}
                                className='h-[1rem] mb-[0.625rem] p-[0.75rem] emailInput group' 
                            />
                        </li>
                        <li className='flex flexrow'>
                            <p className='mr-[2rem] text-nowrap'>
                                password: String (*)
                            </p>

                            <input 
                                name='inputPassword'
                                type='password'
                                required={true}
                                maxLength={80}
                                className='h-[1rem] mb-[0.625rem] p-[0.75rem] emailInput group' 
                            />
                        </li>
                    </ul>

                    <div className='flex justify-end w-full'>
                        <button className='borderBlack'>
                            Try Me
                        </button>
                    </div>
                </div>
            </div>

            <div className='flex flex-col justify-start m-[0.5rem] p-[0.5rem] borderBlack100'>
                <div className='flex flex-row justify-start'>
                    <p className='text-2xl text-red-500 font-bold'>
                        GET
                    </p>
                    <p className='flex flex-wrap justify-end w-full text-2xl'>
                        /api/users
                    </p>
                </div>
                
                <hr className='mt-[0.5rem] mb-[1rem] bg-white dark:bg-black'/>

                <p className='italic font-bold'>
                    Authentication Required
                </p>
            </div>
        </section>
    )
}