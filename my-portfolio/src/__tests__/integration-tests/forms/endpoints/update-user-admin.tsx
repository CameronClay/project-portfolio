/* eslint-disable jest/expect-expect */

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';

import '@src/jest/setup/db-setup';
import '@src/jest/setup/server-setup';

import { RESTMethodType } from '@src//constants/api/constants';
import APIEndpoint from '@src//components/api/api-endpoint/endpoint';
import { FormUpdateUser } from '@src/components/api/api-endpoint/forms/endpoint-form-admin';
import { sleep } from '@src/lib/utils/thread-utils';
import * as users_db from '@src/lib/database/c_users';
import * as tapi from '@src/lib/api/main';
import { FormTest } from '@src/jest/helpers/update-user-test-utils';

describe('APIEndpointForm', () => {
    const METHOD = RESTMethodType.PATCH;
    const ENDPOINT = '/api/private/account/update';
    const DESCRIPTION = 'Update user. Requires logged in user with admin permissions.'
    const render_form = () => {
        render(<APIEndpoint
            method={METHOD}
            endpoint={ENDPOINT}
            description={DESCRIPTION}
            auth_required={true}
            form={<FormUpdateUser />}
        />);
    };

    const find_message_display = async () => {
        return screen.findByLabelText(/^Response/i);
    };
    const query_message_display = () => {
        return screen.queryByLabelText(/^Response/i);
    };

    const validate_init_elems = () => {
        FormTest.validate_init_elems_base();

        expect(query_message_display()).not.toBeInTheDocument();

        expect(screen.getByText(ENDPOINT)).toBeInTheDocument();
        expect(screen.getByText(DESCRIPTION)).toBeInTheDocument();
        expect(screen.getByText(METHOD)).toBeInTheDocument();
        expect(screen.getByText(/Authentication Required/i)).toBeInTheDocument();

        let link = screen.queryByRole('link', { name: /Login/i });
        expect(link).toBeInTheDocument(); 404
        expect(link).toHaveAttribute('href');

        link = screen.queryByRole('link', { name: /Register/i });
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href');
    };

    const validate_complete = async () => {
        expect(await find_message_display()).toHaveTextContent(/admin successfully updated/i);
        expect(await find_message_display()).toHaveTextContent(/"status":\s*200/i);
    };

    const validate_insufficent_permissions = async () => {
        expect(await find_message_display()).toHaveTextContent(/Insufficent permissions/i);
        expect(await find_message_display()).toHaveTextContent(/"status":\s*401/i);
    };

    const validate_user_doesnt_exist = async () => {
        expect(await find_message_display()).toHaveTextContent(/User:\s*admin not found/i);
        expect(await find_message_display()).toHaveTextContent(/"status":\s*404/i);
    };

    const validate_not_logged_in = async () => {
        expect(await find_message_display()).toHaveTextContent(/Unauthorized/i);
        expect(await find_message_display()).toHaveTextContent(/Cookie not present in request/i);
        expect(await find_message_display()).toHaveTextContent(/"status":\s*401/i);
    };

    const validate_incomplete = async () => {
        await sleep(200);
        expect(query_message_display()).not.toBeInTheDocument();
    };

    describe('Renders correctly with positive status', () => {
        it('Renders items correctly', () => {
            render_form();
            validate_init_elems();
        });

        describe('When logged in with sufficent permissions', () => {
            beforeAll(async () => {
                await users_db.create_user('my-admin', 'my-password', true);
                await tapi.login('my-admin', 'my-password');
            });

            afterAll(async () => {
                await tapi.logout();
            });

            describe('When submit button is clicked with all form data present and target user exists', () => {
                beforeEach(async () => {
                    await users_db.create_user('admin', 'my-password', false);
                });

                it('formData present and response displayed', async () => {
                    render_form();
                    await FormTest.fill_form();
                    await validate_complete();
                });
            });

            describe('When submit button is clicked and target user does not exist', () => {
                it('Form does not submit', async () => {
                    render_form();
                    await FormTest.fill_form();
                    await validate_user_doesnt_exist();
                });
            });


            describe('When submit button is clicked without all form data present', () => {
                it('Form does not submit', async () => {
                    render_form();
                    await FormTest.fill_form_incomplete();
                    await validate_incomplete();
                });
            });
        });

        describe('When logged in with insufficent permissions', () => {
            beforeAll(async () => {
                await users_db.create_user('my-admin', 'my-password', false);
                await tapi.login('my-admin', 'my-password');
            });

            afterAll(async () => {
                await tapi.logout();
            });

            describe('When submit button is clicked with all form data present and target user exists', () => {
                beforeEach(async () => {
                    await users_db.create_user('admin', 'my-password', false);
                });

                it('formData present and response displayed', async () => {
                    render_form();
                    await FormTest.fill_form();
                    await validate_insufficent_permissions();
                });
            });
        });

        describe('When submit button is clicked with all form data present and user not logged in', () => {
            it('Missing cookie error displayed', async () => {
                render_form();
                await FormTest.fill_form();
                await validate_not_logged_in();
            });
        });
    });
});