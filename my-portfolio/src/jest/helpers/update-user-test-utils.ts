/*eslint-disable jest/no-standalone-expect*/

import { Matcher, render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import * as api_info from '@src/constants/api/admin-api';
import { sleep } from '@src/lib/utils/thread-utils';

export class FormTest {
    //-------------test data-------------
    static BTN_TEXT = 'Update User';
    static PARAMS = api_info.UPDATE_USER_PARAMS;

    static POSITIVE_RESPONSE = 'Test response';
    static NEGATIVE_RESPONSE = 'Error response';
    static POSITIVE_STATUS = 200;
    static NEGATIVE_STATUS = 500;
    static FORM_DATA: Record<string, string> = { username: 'admin', password: 'my-password', new_username: 'admin2', new_password: '' };

    private static get_username_input() {
        return screen.getByLabelText(/^username$/i);
    }
    private static get_password_input() {
        return screen.getByLabelText(/^password$/i);
    }
    private static get_new_username_input() {
        return screen.getByLabelText(/^new_username$/i);
    }
    private static get_new_password_input() {
        return screen.getByLabelText(/^new_password$/i);
    }
    private static get_submit_btn() {
        return screen.getByRole('button', { name: /update user/i });
    }
    //-----------------------------------

    constructor(
        private positive_response: Matcher,
        private negative_response: Matcher,
        private get_response: jest.Mock,
        private get_response_error: jest.Mock) { }

    //-----------------------------------

    get_message_regex = (resp: string) => {
        return new RegExp(String.raw`\\?"message\\?"\s*:\s*\\?"${resp}\\?"`, 'i');
    }

    get_response_regex = (resp: string) => {
        return new RegExp(String.raw`${resp}`, 'i');
    }

    public validate_init_elems() {
        expect(FormTest.get_username_input()).toBeInTheDocument();
        expect(FormTest.get_password_input()).toBeInTheDocument();
        expect(FormTest.get_new_username_input()).toBeInTheDocument();
        expect(FormTest.get_new_password_input()).toBeInTheDocument();

        expect(FormTest.get_submit_btn()).toBeInTheDocument();

        expect(screen.queryByText(this.negative_response)).not.toBeInTheDocument();
        expect(screen.queryByText(this.positive_response)).not.toBeInTheDocument();
    }

    public async validate_changes(error_response: boolean) {
        let present_text: Matcher, not_present_text: Matcher;
        let response_fn: jest.Mock;
        let status: number;
        if (error_response) {
            present_text = this.negative_response;
            not_present_text = this.positive_response;
            status = FormTest.NEGATIVE_STATUS;
            response_fn = this.get_response_error;
        }
        else {
            present_text = this.positive_response;
            not_present_text = this.negative_response;
            status = FormTest.POSITIVE_STATUS;
            response_fn = this.get_response;
        }


        await waitFor(() => expect(response_fn).toHaveBeenCalledWith(FormTest.FORM_DATA));
        expect(await screen.findByText(present_text)).toBeInTheDocument();
        await waitFor(() => expect(screen.queryByText(not_present_text)).not.toBeInTheDocument());
    }

    public async validate_incomplete() {
        await sleep(200);

        expect(this.get_response).not.toHaveBeenCalled();
        expect(this.get_response_error).not.toHaveBeenCalled();
        expect(screen.queryByText(this.negative_response)).not.toBeInTheDocument();
        expect(screen.queryByText(this.positive_response)).not.toBeInTheDocument();
    }

    public async fill_form() {
        await user.type(screen.getByLabelText(/^username$/i), FormTest.FORM_DATA.username);
        await user.type(screen.getByLabelText(/^password$/i), FormTest.FORM_DATA.password);
        await user.type(screen.getByLabelText(/^new_username$/i), FormTest.FORM_DATA.new_username);

        const submit_btn = screen.getByRole('button', { name: /update user/i });
        await user.click(submit_btn);
    }

    public async fill_form_incomplete() {
        await user.type(screen.getByLabelText(/^username$/i), FormTest.FORM_DATA.username);
        await user.type(screen.getByLabelText(/^new_username$/i), FormTest.FORM_DATA.new_username);

        const submit_btn = screen.getByRole('button', { name: /update user/i });
        await user.click(submit_btn);
    }

    public clear_mocks() {
        //clear called count between tests
        this.get_response.mockClear();
        this.get_response_error.mockClear();
    }
}