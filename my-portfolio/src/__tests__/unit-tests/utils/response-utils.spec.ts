import { headers_to_string, response_to_string } from '@src/lib/utils/response-utils';

describe('response utilities', () => {
    it('headers_to_string works correctly', () => {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const str = headers_to_string(headers);

        expect(str).toMatch(/\{\s*"[Cc]ontent-[Tt]ype"\s*:\s*"application\/json"\s*\}/); //verify headers are correct
    });

    it('response_to_string works correctly', async () => {
        const response = Response.json({ 'key1': 'value1', 'key2': 'value2' }, { status: 200, headers: { 'Content-Type': 'application/json' } });
        const str = await response_to_string(response);

        expect(str).toMatch(/(.*:.*,)*(.*:.*)/); //check general format of json
        expect(str).toMatch(/"body"\s*:\s*\{\s*"key1"\s*:\s*"value1",\s*"key2"\s*:\s*"value2"\s*\}/) //verify body is correct
        expect(str).toMatch(/"headers"\s*:\s*\{\s*"[Cc]ontent-[Tt]ype"\s*:\s*"application\/json"\s*\}/); //verify headers are correct
        expect(str).toMatch(/"status"\s*:\s*200/); //verify status is correct

        // expect(str).toMatch(new RegExp('\"body\" *: *\{ *\"key1\": *\"value1\", *\"key2\": *\"value2\" *\}'));
        // expect(str).toMatch(new RegExp('\"headers\" *: *\{ *\"Content-Type\": *\"application\/json\" *\}'));
        // expect(str).toMatch(new RegExp('\"status\" *: *200'));
    });
});