'use client';

import React from 'react';
import { Section } from '@src/constants/api/section-data';
import { useSectionInView } from '@src/lib/hooks';
import { RESTMethodType } from '@src/components/api/api-endpoint-base';
import APIEndpoint from '@src/components/api/api-endpoint';
import * as api_test from '@src/lib/api-test';

//can also submit form directly to api instead of converting it to json see
//https://stackoverflow.com/questions/41431322/how-to-convert-formdata-html5-object-to-json
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
                get_response={
                    async (forminfo : object) => { 
                        return await api_test.get_test_endpoint();
                    }
                }
                method={RESTMethodType.GET}
                endpoint='/api/public/test-endpoint'
                description='Test endpoint with sample get_test_endpoint'
                paramaters={[]}
            >

            </APIEndpoint>

            <APIEndpoint
                get_response={
                    async (forminfo : object) => { 
                        return await api_test.register(forminfo.username, forminfo.password);
                    }
                }
                method={RESTMethodType.POST}
                endpoint='/api/public/register'
                description='Register user for future login requests.'
                paramaters={[
                    {
                        name: 'username',
                        type: 'string',
                        required: true,
                        inputId: 'username'
                    },
                    {
                        name: 'password',
                        type: 'string',
                        required: true,
                        inputId: 'password'
                    }
                ]}
            >

            </APIEndpoint>

            <APIEndpoint
                get_response={
                    async (forminfo : object) => { 
                        return await api_test.login(forminfo.username, forminfo.password);
                    }
                }
                method={RESTMethodType.POST}
                endpoint='/api/public/login'
                description='Login user and cache JWT token in cookies for future requests.'
                paramaters={[
                    {
                        name: 'username',
                        type: 'string',
                        required: true,
                        inputId: 'username'
                    },
                    {
                        name: 'password',
                        type: 'string',
                        required: true,
                        inputId: 'password'
                    }
                ]}
            >

            </APIEndpoint>

            <APIEndpoint
                get_response={
                    async (forminfo : object) => { 
                        return await api_test.get_test_endpoint_priv();
                    }
                }
                method={RESTMethodType.GET}
                endpoint='/api/private/test-endpoint-priv'
                description='Test endpoint with sample data. Requires logged in user (Authentication required).'
                paramaters={[]}
            >

            </APIEndpoint>
            
            <APIEndpoint
                get_response={
                    async (forminfo : object) => { 
                        return await api_test.get_users();
                    }
                }
                method={RESTMethodType.GET}
                endpoint='/api/private/users'
                description='Retreive a list of all users. Requires logged in user with admin permissions (Authentication required).'
                paramaters={[]}
            >

            </APIEndpoint>

            <APIEndpoint
                get_response={
                    async (forminfo : object) => { 
                        return await api_test.get_user(forminfo.user_id);
                    }
                }
                method={RESTMethodType.GET}
                endpoint='/api/private/user?user_id=user_id'
                description='Retreive user information from user_id. Requires logged in user with admin permissions (Authentication required).'
                paramaters={[ 
                    {
                        name: 'user_id',
                        type: 'string',
                        required: true,
                        inputId: 'user_id'
                    }
                ]}
            >

            </APIEndpoint>

            <APIEndpoint
                get_response={
                    async (forminfo : object) => { 
                        return await api_test.update_user(forminfo.username, forminfo.password, forminfo.new_username, forminfo.new_password);
                    }
                }
                method={RESTMethodType.PATCH}
                endpoint='/api/private/user'
                description='Modify username/password. Requires logged in user with admin permissions (Authentication required).'
                paramaters={[
                    {
                        name: 'username',
                        type: 'string',
                        required: true,
                        inputId: 'username'
                    },
                    {
                        name: 'password',
                        type: 'string',
                        required: true,
                        inputId: 'password'
                    },
                    {
                        name: 'new_username',
                        type: 'string',
                        required: false,
                        inputId: 'new_username'
                    },
                    {
                        name: 'new_password',
                        type: 'string',
                        required: false,
                        inputId: 'new_password'
                    }
                ]}
            >

            </APIEndpoint>
            
            <APIEndpoint
                get_response={
                    async (forminfo : object) => { 
                        return await api_test.delete_user_by_username(forminfo.username, forminfo.password);
                    }
                }
                method={RESTMethodType.DELETE}
                endpoint='/api/private/user'
                description='Retreive user information from user_id. Requires logged in user with admin permissions (Authentication required).'
                paramaters={[
                    {
                        name: 'username',
                        type: 'string',
                        required: true,
                        inputId: 'username'
                    },
                    {
                        name: 'password',
                        type: 'string',
                        required: true,
                        inputId: 'password'
                    }
                ]}
            >

            </APIEndpoint>
            
            <APIEndpoint
                get_response={
                    async (forminfo : object) => { 
                        return await api_test.get_stat(forminfo.entry_id);
                    }
                }
                method={RESTMethodType.GET}
                endpoint='/api/private/stat?entry_id=entry_id'
                description='Retreive basic website statistics. Requires logged in user with admin permissions (Authentication required).'
                paramaters={[ 
                    {
                        name: 'entry_id',
                        type: 'string',
                        required: true,
                        inputId: 'entry_id'
                    }
                ]}
            >

            </APIEndpoint>

            <APIEndpoint
                get_response={
                    async (forminfo : object) => { 
                        return await api_test.get_stats();
                    }
                }
                method={RESTMethodType.GET}
                endpoint='/api/private/stats'
                description='Retreive basic website statistics. Requires logged in user with admin permissions (Authentication required).'
                paramaters={[]}
            >

            </APIEndpoint>

            <APIEndpoint
                get_response={
                    async (forminfo : object) => { 
                        return await api_test.clear_stats();
                    }
                }
                method={RESTMethodType.DELETE}
                endpoint='/api/private/stats'
                description='Clear all website statistics. Requires logged in user with admin permissions (Authentication required).'
                paramaters={[]}
            >

            </APIEndpoint>
        </section>
    )
}