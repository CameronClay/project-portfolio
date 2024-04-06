import React from 'react';
import Api from '@src/components/api/api';
import { RESTMethodType } from '@src/constants/api/constants';
import APIEndpoint from '@src/components/api/api-endpoint/endpoint';
import * as api_forms from '@src/components/api/api-endpoint/endpoint-form-admin';

//can also submit form directly to api instead of converting it to json see
//https://stackoverflow.com/questions/41431322/how-to-convert-formdata-html5-object-to-json
export default function APIAdmin() {
    return (
        <Api>
            <APIEndpoint
                method={RESTMethodType.GET}
                endpoint='/api/private/admin/users'
                description='Retreive a list of all users. Requires logged in user with admin permissions.'
                auth_required={true}
                form={<api_forms.FormGetUsers />}
            >

            </APIEndpoint>

            <APIEndpoint
                method={RESTMethodType.GET}
                endpoint='/api/private/admin/user?user_id=user_id'
                description='Retreive user information from user_id. Requires logged in user with admin permissions.'
                auth_required={true}
                form={<api_forms.FormGetUser />}

            >

            </APIEndpoint>

            <APIEndpoint
                method={RESTMethodType.PATCH}
                endpoint='/api/private/account/update'
                description='Modify username/password. Requires logged in user with admin permissions.'
                auth_required={true}
                form={<api_forms.FormUpdateUser />}
            >

            </APIEndpoint>
            
            <APIEndpoint
                method={RESTMethodType.DELETE}
                endpoint='/api/private/account/delete'
                description='Delete user. Requires logged in user with admin permissions.'
                auth_required={true}
                form={<api_forms.FormDeleteUser />}
            >

            </APIEndpoint>
            
            <APIEndpoint
                method={RESTMethodType.GET}
                endpoint='/api/private/admin/stat?entry_id=entry_id'
                description='Retreive basic website statistics. Requires logged in user with admin permissions.'
                auth_required={true}
                form={<api_forms.FormGetStat />}
            >

            </APIEndpoint>

            <APIEndpoint
                method={RESTMethodType.GET}
                endpoint='/api/private/admin/stats'
                description='Retreive basic website statistics. Requires logged in user with admin permissions.'
                auth_required={true}
                form={<api_forms.FormGetStats />}
            >

            </APIEndpoint>

            <APIEndpoint
                method={RESTMethodType.DELETE}
                endpoint='/api/private/admin/stats'
                description='Clear all website statistics. Requires logged in user with admin permissions.'
                auth_required={true}
                form={<api_forms.FormClearStats />}
            >

            </APIEndpoint>
        </Api>
    )
}