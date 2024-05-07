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
    // maxWorkers: 1, //maximum number of workers that Jest can spawn in parallel (similar to --runInBand argument)
    globalSetup: '<rootDir>/jest.global.setup.ts',
    globalTeardown: '<rootDir>/jest.global.teardown.ts',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    moduleNameMapper: {
        "^@src/(.*)$": "<rootDir>/src/$1", //needed for module path aliases e.g. @src/.*
    },
    testEnvironmentOptions: { //needed for msw
        customExportConditions: [''],
    },
    testTimeout: 30000,
};
module.exports = createJestConfig(customJestConfig);