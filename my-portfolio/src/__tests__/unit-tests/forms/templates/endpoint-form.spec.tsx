/* eslint-disable jest/expect-expect */

import React from 'react';
import { screen, render, waitFor } from '@testing-library/react';

import APIEndpointForm, { APIEndpointResponse } from '@src/components/api/api-endpoint/components/endpoint-form';
import APIEndpointContextProvider from '@src/context/response-text-context';
import { FormTest } from '@src/jest/helpers/update-user-test-utils';
import { sleep } from '@src/lib/utils/thread-utils';
import { GenericResponse } from '@src/constants/api/generic';

describe('APIEndpointForm', () => {
    const render_form = (get_response: jest.Mock) => {
        render(
            <APIEndpointContextProvider>
                <APIEndpointForm
                    btn_text={FormTest.BTN_TEXT}
                    parameters={FormTest.PARAMS}
                    get_response={get_response}
                />

                <APIEndpointResponse />
            </APIEndpointContextProvider>
        );
    };
    const get_response = jest.fn().mockImplementation(async (forminfo: Record<string, string>) => {
        await sleep(50);
        return Response.json({ message: FormTest.POSITIVE_RESPONSE } as GenericResponse, { status: FormTest.POSITIVE_STATUS });
    });
    const get_response_error = jest.fn().mockImplementation(async (forminfo: Record<string, string>) => {
        await sleep(50);
        return Response.json({ message: FormTest.NEGATIVE_RESPONSE } as GenericResponse, { status: FormTest.NEGATIVE_STATUS });
    });

    const get_message_regex = (resp: string) => {
        return new RegExp(String.raw`\\?"message\\?"\s*:\s*\\?"${resp}\\?"`, 'i');
    };
    const get_status_regex = (status: number) => {
        return new RegExp(String.raw`\\?"status\\?"\s*:\s*${status}`, 'i');
    }

    const ftest = new FormTest(get_message_regex(FormTest.POSITIVE_RESPONSE), get_message_regex(FormTest.NEGATIVE_RESPONSE), get_response, get_response_error);

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
                expect(await screen.findByText(get_status_regex(FormTest.POSITIVE_STATUS))).toBeInTheDocument();
            });
        })

        describe('When submit button is clicked without all form data present', () => {
            it('Form does not submit', async () => {
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
                expect(await screen.findByText(get_status_regex(FormTest.NEGATIVE_STATUS))).toBeInTheDocument();
            });
        })

        describe('When submit button is clicked without all form data present', () => {
            it('Form does not submit', async () => {
                render_form(get_response_error);
                await ftest.fill_form_incomplete();
                await ftest.validate_incomplete();
            });
        });
    });
});