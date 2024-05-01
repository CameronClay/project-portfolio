/** @type {import('next').NextConfig} */
//can be next.config.js or next.config.mjs
//cannot import a ts file in a js file without first transpiling it to js

// import { PHASE_DEVELOPMENT_SERVER } from 'next';
// import { Database, setup_db } from './src/lib/database/mongodb.js';
// const { Database, setup_db } = require('./src/lib/database/mongodb');

// if (PHASE_DEVELOPMENT_SERVER) {
//     setup_db(Database.PORTFOLIO);
// }

// const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

const nextConfig = {
    reactStrictMode: true,
    experimental: {
        forceSwcTransforms: true,
        // instrumentationHook: true
    }
};

module.exports = nextConfig;