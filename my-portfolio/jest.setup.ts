//this file runs once before each test suite runs

import '@testing-library/jest-dom';
import 'whatwg-fetch'; // used for fetch calls with msw
import '@src/jest/load-environment';
import '@src/jest/mocks';