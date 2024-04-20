const Environment = require('jest-environment-jsdom').TestEnvironment;

class CustomTestEnvironment extends Environment {
    async setup() {
        await super.setup();
        if (typeof this.global.TextEncoder === 'undefined') {
            const { TextEncoder } = require('util');
            this.global.TextEncoder = TextEncoder;
        }
        this.global.TextDecoder = TextDecoder;
        this.global.Response = Response;
        this.global.Request = Request;
    }
}

/**
 * A custom environment to set the TextEncoder that is required by TensorFlow.js.
 */
module.exports = CustomTestEnvironment;