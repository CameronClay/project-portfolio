/* eslint-disable jest/expect-expect */

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';

import '@src/jest/setup/db-setup';
import '@src/jest/setup/server-setup';

import * as users_db from '@src/lib/database/c_users';
import Register from '@src/components/user/register';
import { sleep } from '@src/lib/utils/thread-utils';

describe('RegisterForm works correctly', () => {
    const render_form = () => {
        render(
            <Register />
        );
    };

    const get_username_input = () => {
        return screen.getByLabelText(/^Username$/i)
    };
    const get_password_input = () => {
        return screen.getByLabelText(/^Password$/i)
    };
    const get_password_repeat_input = () => {
        return screen.getByLabelText(/^Repeat password$/i)
    };
    const get_submit_btn = () => {
        return screen.getByRole('button', { name: /Register/i })
    };

    const find_message_display = async () => {
        return screen.findByLabelText(/^Response$/i);
    };
    const find_error_display = async () => {
        return screen.findByLabelText(/^Response Error$/i);
    };
    const query_message_display = () => {
        return screen.queryByLabelText(/^Response$/i);
    };
    const query_error_display = () => {
        return screen.queryByLabelText(/^Response Error$/i);
    };

    const fill_form = async () => {
        await user.type(get_username_input(), 'admin');
        await user.type(get_password_input(), 'my-password');
        await user.type(get_password_repeat_input(), 'my-password');
        await user.click(get_submit_btn());
    };

    const fill_form_incomplete = async () => {
        await user.type(get_username_input(), 'admin');
        await user.type(get_password_input(), 'my-password');
        await user.click(get_submit_btn());
    };

    const fill_form_mismatched_passwords = async () => {
        await user.type(get_username_input(), 'admin');
        await user.type(get_password_input(), 'my-password');
        await user.type(get_password_repeat_input(), 'my-password2');
        await user.click(get_submit_btn());
    };

    const validate_init_elems = () => {
        expect(get_username_input()).toBeInTheDocument();
        expect(get_password_input()).toBeInTheDocument();
        expect(get_password_repeat_input()).toBeInTheDocument();
        expect(get_submit_btn()).toBeInTheDocument();
        expect(query_message_display()).not.toBeInTheDocument();
        expect(query_error_display()).not.toBeInTheDocument();
    };


    const validate_complete = async () => {
        expect(await find_message_display()).toHaveTextContent(/Registration successful/i);
        await sleep(25);
        expect(query_error_display()).not.toBeInTheDocument();
    };

    const validate_incomplete = async () => {
        await sleep(200);
        expect(query_message_display()).not.toBeInTheDocument();
        expect(query_error_display()).not.toBeInTheDocument();
    };

    const validate_mismatched_passwords = async () => {
        expect(await find_error_display()).toHaveTextContent(/Passwords do not match/i);
        await sleep(25);
        expect(query_message_display()).not.toBeInTheDocument();
    };
    const validate_already_registered = async () => {
        expect(await find_error_display()).toHaveTextContent(/Username already exists/i);
        await sleep(25);
        expect(query_message_display()).not.toBeInTheDocument();
    };

    describe('Renders correctly with positive status', () => {
        it('Renders items correctly', () => {
            render_form();
            validate_init_elems();
        });

        describe('When submit button is clicked with all form data present and user not already registered', () => {
            it('formData present and response displayed', async () => {
                render_form();
                await fill_form();
                await validate_complete();
            });
        });

        describe('When submit button is clicked with all form data present and user already registered', () => {
            beforeEach(async () => {
                const cres = await users_db.create_user('admin', 'my-password', false);
            });

            it('Already registered error displayed', async () => {
                render_form();
                await fill_form();
                await validate_already_registered();
            });
        });

        describe('When submit button is clicked without all form data present', () => {
            it('Form does not submit', async () => {
                render_form();
                await fill_form_incomplete();
                await validate_incomplete();
            });
        });

        describe('When submit button is clicked with mismatched passwords', () => {
            it('Form does not submit and mismatched password error displayed', async () => {
                render_form();
                await fill_form_mismatched_passwords();
                await validate_mismatched_passwords();
            });
        });
    });
});