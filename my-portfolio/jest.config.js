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

const nextJest = require("next/jest");
const createJestConfig = nextJest({
    dir: "./",
});
const customJestConfig = {
    roots: ["<rootDir>"],
    modulePaths: ["<rootDir>", "<rootDir>/src"],
    moduleDirectories: ["node_modules"],
    testEnvironment: "./custom-test-env",
    moduleNameMapper: {
        "^@src/(.*)$": "<rootDir>/src/$1", //needed for module path aliases e.g. @src/.*
    }
    // testEnvironment: "jest-environment-jsdom",
};
module.exports = createJestConfig(customJestConfig);