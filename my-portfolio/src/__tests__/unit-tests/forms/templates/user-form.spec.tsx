/* eslint-disable jest/expect-expect */

import React from 'react';
import { render } from '@testing-library/react';

import UserForm, { UserFormProps, UserFormResponse } from '@src/components/user/components/user-form';
import APIEndpointContextProvider from '@src/context/response-text-context';
import { FormTest } from '@src/jest/helpers/update-user-test-utils';
import { sleep } from '@src/lib/utils/thread-utils';

describe('UserForm', () => {
    const render_form = (get_response: jest.Mock) => {
        render(
            <APIEndpointContextProvider>
                <UserForm
                    btn_text={FormTest.BTN_TEXT}
                    form_inputs={FormTest.PARAMS}
                    get_response={get_response}
                />

                <UserFormResponse />
            </APIEndpointContextProvider>
        );
    };
    const get_response = jest.fn().mockImplementation(async (forminfo: Record<string, string>) => {
        await sleep(50);
        return Response.json({ message: FormTest.POSITIVE_RESPONSE }, { status: FormTest.POSITIVE_STATUS });
    });
    const get_response_error = jest.fn().mockImplementation(async (forminfo: Record<string, string>) => {
        await sleep(50);
        return Response.json({ message: FormTest.NEGATIVE_RESPONSE }, { status: FormTest.NEGATIVE_STATUS });
    });
    const ftest = new FormTest(new RegExp(FormTest.POSITIVE_RESPONSE, 'i'), new RegExp(FormTest.NEGATIVE_RESPONSE, 'i'), get_response, get_response_error);

    afterEach(() => {
        //clear called count between tests
        ftest.clear_mocks();
    });

    describe('Renders correctly with positive status', () => {
        it('Renders items correctly', () => {
            render_form(get_response);
            ftest.validate_init_elems();
        });

        describe('When submit button is clicked with all form data present', () => {
            it('formData present and response received', async () => {
                render_form(get_response);
                await ftest.fill_form();
                await ftest.validate_changes(false);
            });
        });

        describe('When submit button is clicked without all form data present', () => {
            it('formData present and response received', async () => {
                render_form(get_response);
                await ftest.fill_form_incomplete();
                await ftest.validate_incomplete();
            });
        });
    });

    describe('Renders correctly with negative status', () => {
        it('Renders items correctly', () => {
            render_form(get_response_error);
            ftest.validate_init_elems();
        });

        describe('When submit button is clicked with all form data present', () => {
            it('formData present and response received', async () => {
                render_form(get_response_error);
                await ftest.fill_form();
                await ftest.validate_changes(true);
            });
        });

        describe('When submit button is clicked without all form data present', () => {
            it('formData present and response received', async () => {
                render_form(get_response_error);
                await ftest.fill_form_incomplete();
                await ftest.validate_incomplete();
            });
        });
    });
});