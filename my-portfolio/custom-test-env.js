// const Environment = require('jest-environment-jsdom');
// /**
//  * A custom environment to set the TextEncoder
//  */
// module.exports = class CustomTestEnvironment extends Environment {
//     constructor({ globalConfig, projectConfig }, context) {
//         super({ globalConfig, projectConfig }, context);
//         if (typeof this.global.TextEncoder === 'undefined') {
//             const { TextEncoder } = require('util');
//             this.global.TextEncoder = TextEncoder;
//         }
//     }
// };

const Environment = require('jest-environment-jsdom').TestEnvironment;

class CustomTestEnvironment extends Environment {
    async setup() {
        await super.setup();
        if (typeof this.global.TextEncoder === 'undefined') {
            const { TextEncoder } = require('util');
            this.global.TextEncoder = TextEncoder;
        }
    }
}

/**
 * A custom environment to set the TextEncoder that is required by TensorFlow.js.
 */
module.exports = CustomTestEnvironment;