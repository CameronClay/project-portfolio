//this file runs once before each test suite runs

import '@testing-library/jest-dom';
import 'whatwg-fetch'; // used for fetch calls with msw

// import '@src/test-setup/jest-db-setup';
// import '@src/test-setup/jest-server-setup';



//jsdom doesn't support TextEncoder and TextDecoder
// import { TextEncoder, TextDecoder } from 'util';
// Object.assign(global, { TextDecoder, TextEncoder });
// global.Uint8Array = Uint8Array2;
// global.Uint8Array = require('buffer').Uint8Array;
// Object.assign(global, { Uint8Array: typeof Uint8Array });
// global.Uint8Array = require('Uint8Array');


// import '@src/test-setup/jest-db-setup';
// import '@src/test-setup/jest-server-setup';