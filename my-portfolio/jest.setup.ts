//this file runs once before each test suite runs

import '@testing-library/jest-dom';
import 'whatwg-fetch'; // used for fetch calls with msw
import '@src/jest/jest-environment';
import '@src/jest/jest-mocks';