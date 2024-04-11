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
    moduleDirectories: ["node_modules", "<rootDir>/"],
    testEnvironment: "./custom-test-env",
    // testEnvironment: "jest-environment-jsdom",
};
module.exports = createJestConfig(customJestConfig);