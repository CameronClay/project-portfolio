// //needed for jest
// module.exports = {
//     preset: 'ts-jest',
//     testEnvironment: 'jest-environment-jsdom',
//     // testEnvironment: 'jsdom',
//     // testEnvironment: 'node',
//     transform: {
//         "^.+\\.(t|j)sx?$": "ts-jest"
//     }
// }

const { TestEnvironment } = require("jest-environment-jsdom");
const nextJest = require("next/jest");
const createJestConfig = nextJest({
    dir: "./",
});
const customJestConfig = {
    preset: "ts-jest",
    roots: ["<rootDir>"],
    modulePaths: ["<rootDir>", "<rootDir>/src"],
    moduleDirectories: ["node_modules"],
    testEnvironment: "./custom-test-env",
    // testEnvironment: "node",
    // testEnvironment: "jest-environment-jsdom",
    // setupFiles: ['<rootDir>/.env.local'],
    // maxWorkers: 1, //maximum number of workers that Jest can spawn in parallel (similar to --runInBand CI argument)
    globalSetup: '<rootDir>/jest.global.setup.ts',
    globalTeardown: '<rootDir>/jest.global.teardown.ts',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    moduleNameMapper: {
        "^@src/(.*)$": "<rootDir>/src/$1", //needed for module path aliases e.g. @src/.*
    },
    testEnvironmentOptions: { //needed for msw
        customExportConditions: [''],
    },
    globals: {
        Uint8Array: Uint8Array,
        ArrayBuffer: ArrayBuffer,
        // 'ts-jest': {
        //     diagnostics: {
        //         exclude: ['**'],
        //     }
        // },
    },
    // transform: {
    //     "^.+\\.tsx?$": [
    //         "ts-jest",
    //         {
    //             diagnostics: false,
    //         },
    //     ],
    // },
};
module.exports = createJestConfig(customJestConfig);