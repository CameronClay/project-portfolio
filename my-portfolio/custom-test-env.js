const Environment = require('jest-environment-jsdom').TestEnvironment;

//https://github.com/jestjs/jest/issues/2549
//https://github.com/mswjs/msw/discussions/1934

class CustomTestEnvironment extends Environment {
    async setup() {
        await super.setup();
        // if (typeof this.global.TextEncoder === 'undefined') {
        //     const { TextEncoder } = require('util');
        //     this.global.TextEncoder = TextEncoder;
        // }
        // const { TextEncoder, TextDecoder } = require('util');
        // this.global.TextEncoder = TextEncoder;
        // this.global.TextDecoder = TextDecoder;
        // // this.global.Response = Response;
        // // this.global.Request = Request;

        this.global.Uint8Array = Uint8Array;

        const { TextDecoder, TextEncoder, ReadableStream } = require("node:util")

        this.global.ReadableStream = ReadableStream;
        this.global.TextDecoder = TextDecoder;
        this.global.TextEncoder = TextEncoder;
        this.global.JSON = JSON;

        const { Blob, File } = require("node:buffer")
        // const { fetch, Headers, FormData, Request, Response } = require("node:stream/web")

        this.global.Blob = Blob;
        this.global.File = File;
        this.global.Headers = Headers;
        this.global.FormData = FormData;
        this.global.Request = Request;
        this.global.Response = Response;
        this.global.fetch = fetch;
        this.global.structuredClone = structuredClone;
    }
}

module.exports = CustomTestEnvironment;