import React from 'react';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';

import '@src/jest/setup/db-setup';
import '@src/jest/setup/server-setup';

import * as api_tmain from '@src/lib/api/main';
import * as users_db from '@src/lib/database/c_users';
import * as api_info from '@src/constants/api/main-api';
import Form from '@src/components/form';
import SubmitBtn from '@src/components/submit-btn';

describe('Form', () => {
    const on_submit = jest.fn().mockImplementation(async (forminfo: Record<string, string>) => { });

    const render_form = () => {
        render(
            <Form
                submit_btn={
                    <SubmitBtn text='Login' />
                }
                form_inputs={api_info.LOGIN_USER_PARAMS}
                handle_submit={on_submit}
                refresh_on_submit={false}
                input_disp_width="w-[10rem]"
            />
        );
    };

    afterEach(() => {
        //clear called count between tests
        on_submit.mockClear();
    })

    it('login formData present', async () => {
        render_form();

        await user.type(screen.getByLabelText(/username/i), 'admin');
        await user.type(screen.getByLabelText(/password/i), 'my-password');

        const submit_btn = screen.getByRole('button', { name: /login/i });
        await user.click(submit_btn);

        expect(on_submit).toHaveBeenCalledWith({ username: 'admin', password: 'my-password' });
    });
});