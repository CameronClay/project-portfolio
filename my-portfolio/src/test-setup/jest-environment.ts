//import statements in typescript are hoisted to the top of the file
import { config } from 'dotenv';

const res = config({ path: '.env.local' });
if (res.error) {
    throw res.error;
}