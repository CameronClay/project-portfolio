import React from 'react';
import Api from '@src/components/api/api';
import { RESTMethodType } from '@src/constants/api/constants';
import APIEndpoint from '@src/components/api/api-endpoint/endpoint';
import * as api_forms from '@src/components/api/api-endpoint/endpoint-form-public';

//can also submit form directly to api instead of converting it to json see
//https://stackoverflow.com/questions/41431322/how-to-convert-formdata-html5-object-to-json
export default function APIPublic() {
    return (
        <Api>
            <APIEndpoint
                method={RESTMethodType.GET}
                endpoint='/api/public/test-endpoint'
                description='Test endpoint with sample get_test_endpoint'
                form={<api_forms.FormTest />}
            />

            <APIEndpoint
                method={RESTMethodType.GET}
                endpoint='/api/private/test-endpoint-priv'
                description='Test endpoint with sample data. Requires logged in user.'
                auth_required={true}
                form={<api_forms.FormTestPriv />}
            />

            <APIEndpoint
                method={RESTMethodType.POST}
                endpoint='/api/public/account/register'
                description='Register user for future login requests.'
                form={<api_forms.FormRegisterUser />}
            />

            <APIEndpoint
                method={RESTMethodType.POST}
                endpoint='/api/public/account/login'
                description='Login user and cache JWT token in cookies for future requests.'
                form={<api_forms.FormLoginUser />}
            />

            <APIEndpoint
                method={RESTMethodType.POST}
                endpoint='/api/private/account/logout'
                description='Logout user and expire JWT cookie.'
                form={<api_forms.FormLogoutUser />}
            />

            <APIEndpoint
                method={RESTMethodType.PATCH}
                endpoint='/api/private/account/update'
                description='Modify username/password of the currently logged in user. Requires logged in user.'
                auth_required={true}
                form={<api_forms.FormUpdateUser />}
            />
            
            <APIEndpoint
                method={RESTMethodType.DELETE}
                endpoint='/api/private/account/delete'
                description='Delete the currently logged in user. Requires logged in user.'
                auth_required={true}
                form={<api_forms.FormDeleteUser />}
            />
        </Api>
    )
}