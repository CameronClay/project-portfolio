import { formdata_to_json } from '@src/lib/utils/form-utils'

describe('api utils', () => {
    it('formdata_to_json works correctly with formdata', () => {
        const formdata = new FormData();
        formdata.append('username', 'admin');
        formdata.append('password', 'my-password');
        const json = formdata_to_json(formdata);
        expect(json).toEqual({
            username: 'admin',
            password: 'my-password'
        });
    });

    it('formdata_to_json works correctly without formdata', () => {
        const formdata = new FormData();
        const json = formdata_to_json(formdata);
        expect(json).toEqual({})
    });
});