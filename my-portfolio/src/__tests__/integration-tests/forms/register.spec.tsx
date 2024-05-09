import React from 'react';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';

import '@src/jest/setup/db-setup';
import '@src/jest/setup/server-setup';

import * as api_tmain from '@src/lib/api/main';
import * as users_db from '@src/lib/database/c_users';
import * as api_info from '@src/constants/api/main-api';
import RegisterForm from '@src/components/user/forms/register-form';
import ResponseTextContextProvider from '@src/context/response-text-context';

describe('RegisterForm works correctly', () => {
    const render_form = () => {
        render(
            <ResponseTextContextProvider>
                <RegisterForm />
            </ResponseTextContextProvider>
        );
    };

    it('register formData present', async () => {
        render_form();

        await user.type(screen.getByLabelText(/username/i), 'admin');
        await user.type(screen.getByLabelText(/password/i), 'my-password');

        const submit_btn = screen.getByRole('button', { name: /register/i });
        await user.click(submit_btn);

        expect.assertions(0);
    });
});