const Environment = require('jest-environment-jsdom').TestEnvironment;

class CustomTestEnvironment extends Environment {
    async setup() {
        await super.setup();
        // if (typeof this.global.TextEncoder === 'undefined') {
        //     const { TextEncoder } = require('util');
        //     this.global.TextEncoder = TextEncoder;
        // }
        const { TextEncoder, TextDecoder } = require('util');
        this.global.TextEncoder = TextEncoder;
        this.global.TextDecoder = TextDecoder;
        // this.global.Response = Response;
        // this.global.Request = Request;

        //for some reason this only works in custom test environment and not in jest-setup.ts
        this.global.Uint8Array = Uint8Array;
    }
}

/**
 * A custom environment to set the TextEncoder that is required by TensorFlow.js.
 */
module.exports = CustomTestEnvironment;