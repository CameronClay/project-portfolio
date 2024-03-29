'use client';

import React from 'react';
import { Section } from '@src/constants/api/section-data';
import { useSectionInView } from '@src/lib/hooks';
import APIEndpoint, { RESTMethodType } from '@src/components/api/api-endpoint';

export default function MyAPI() {
    const { ref } = useSectionInView(Section.API, 0.65);

    return (
        <section
            id='api'
            ref={ref}
            className='scroll-mt-[5rem] mb-[2rem]'
        >
            <p className='text-2xl font-bold px-[0.125rem]'>
                API
            </p>

            <APIEndpoint
                method={RESTMethodType.GET}
                endpoint='/api/public/test-endpoint'
                description='Test endpoint with sample data. Does not require logged in user (Authentication not required).'
                paramaters={[]}
            >

            </APIEndpoint>

            <APIEndpoint
                method={RESTMethodType.POST}
                endpoint='/api/public/register'
                description='Register user and cache JWT token in cookies for future requests.'
                paramaters={[
                    {
                        name: 'username',
                        type: 'String',
                        required: true,
                        inputId: 'username'
                    },
                    {
                        name: 'password',
                        type: 'String',
                        required: true,
                        inputId: 'password'
                    }
                ]}
            >

            </APIEndpoint>

            <APIEndpoint
                method={RESTMethodType.POST}
                endpoint='/api/public/login'
                description='Login user and cache JWT token in cookies for future requests.'
                paramaters={[
                    {
                        name: 'username',
                        type: 'String',
                        required: true,
                        inputId: 'username'
                    },
                    {
                        name: 'password',
                        type: 'String',
                        required: true,
                        inputId: 'password'
                    }
                ]}
            >

            </APIEndpoint>

            <APIEndpoint
                method={RESTMethodType.GET}
                endpoint='/api/private/test-endpoint2'
                description='Test endpoint with sample data. Requires logged in user (Authentication required).'
                paramaters={[]}
            >

            </APIEndpoint>
            
            <APIEndpoint
                method={RESTMethodType.GET}
                endpoint='/api/private/users'
                description='Retreive a list of all users. Requires logged in user with admin permissions (Authentication required).'
                paramaters={[]}
            >

            </APIEndpoint>


            <APIEndpoint
                method={RESTMethodType.GET}
                endpoint='/api/private/user/<id>'
                description='Retreive user information from user_id. Requires logged in user with admin permissions (Authentication required).'
                paramaters={[ 
                    {
                        name: 'user_id',
                        type: 'Integer',
                        required: true,
                        inputId: 'username'
                    }
                ]}
            >

            </APIEndpoint>

            <APIEndpoint
                method={RESTMethodType.GET}
                endpoint='/api/private/stats'
                description='Retreive basic website statistics. Requires logged in user with admin permissions (Authentication required).'
                paramaters={[]}
            >

            </APIEndpoint>
        </section>
    )
}