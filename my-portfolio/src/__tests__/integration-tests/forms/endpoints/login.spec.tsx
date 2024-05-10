/* eslint-disable jest/expect-expect */

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';

import '@src/jest/setup/db-setup';
import '@src/jest/setup/server-setup';

import * as users_db from '@src/lib/database/c_users';
import { FormLoginUser } from '@src/components/api/api-endpoint/forms/endpoint-form-public';
import { sleep } from '@src/lib/utils/thread-utils';
import { RESTMethodType } from '@src//constants/api/constants';
import APIEndpoint from '@src//components/api/api-endpoint/endpoint';

describe('RegisterForm works correctly', () => {
    const METHOD = RESTMethodType.POST;
    const ENDPOINT = '/api/public/account/login';
    const DESCRIPTION = 'Login user and cache JWT token in cookies for future requests.'

    const render_form = () => {
        render(
            <APIEndpoint
                method={METHOD}
                endpoint={ENDPOINT}
                description={DESCRIPTION}
                form={<FormLoginUser />}
            />
        );
    };

    const get_username_input = () => {
        return screen.getByLabelText(/^username/i)
    };
    const get_password_input = () => {
        return screen.getByLabelText(/^password/i)
    };
    const get_submit_btn = () => {
        return screen.getByRole('button', { name: /Login/i })
    };

    const find_message_display = async () => {
        return screen.findByLabelText(/^Response/i);
    };
    const query_message_display = () => {
        return screen.queryByLabelText(/^Response/i);
    };

    const fill_form = async () => {
        await user.type(get_username_input(), 'admin');
        await user.type(get_password_input(), 'my-password');
        await user.click(get_submit_btn());
    };

    const fill_form_incomplete = async () => {
        await user.type(get_username_input(), 'admin');
        await user.click(get_submit_btn());
    };

    const validate_init_elems = () => {
        expect(get_username_input()).toBeInTheDocument();
        expect(get_password_input()).toBeInTheDocument();
        expect(get_submit_btn()).toBeInTheDocument();
        expect(query_message_display()).not.toBeInTheDocument();

        expect(screen.getByText(ENDPOINT)).toBeInTheDocument();
        expect(screen.getByText(DESCRIPTION)).toBeInTheDocument();
        expect(screen.getByText(METHOD)).toBeInTheDocument();
        expect(screen.queryByText(/Authentication Required/i)).not.toBeInTheDocument();

        expect(screen.queryByRole('link', { name: /Login/i })).not.toBeInTheDocument();
        expect(screen.queryByRole('link', { name: /Register/i })).not.toBeInTheDocument();
    };

    const validate_complete = async () => {
        expect(await find_message_display()).toHaveTextContent(/Log in successful/i);
        expect(await find_message_display()).toHaveTextContent(/"status":\s*200/i);
    };

    const validate_incomplete = async () => {
        await sleep(200);
        expect(query_message_display()).not.toBeInTheDocument();
    };

    const validate_user_doesnt_exist = async () => {
        expect(await find_message_display()).toHaveTextContent(/User not found/i);
        expect(await find_message_display()).toHaveTextContent(/"status":\s*404/i);
    };

    describe('Renders correctly with positive status', () => {
        it('Renders items correctly', () => {
            render_form();
            validate_init_elems();
        });

        describe('When submit button is clicked with all form data present and user already registered', () => {
            beforeEach(async () => {
                const cres = await users_db.create_user('admin', 'my-password', false);
            });

            it('formData present and response displayed', async () => {
                render_form();
                await fill_form();
                await validate_complete();
            });
        });

        describe('When submit button is clicked with all form data present and user not registered', () => {
            it('Already registered error displayed', async () => {
                render_form();
                await fill_form();
                await validate_user_doesnt_exist();
            });
        });

        describe('When submit button is clicked without all form data present', () => {
            it('Form does not submit', async () => {
                render_form();
                await fill_form_incomplete();
                await validate_incomplete();
            });
        });
    });
});