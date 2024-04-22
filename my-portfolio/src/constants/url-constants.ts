export const LOCAL_URL_BASE = process.env.NEXT_PUBLIC_LOCAL_URL_BASE + ":" + process.env.NEXT_PUBLIC_PORT; //local url without protocol
export const LOCAL_URL = process.env.NEXT_PUBLIC_PROTOCOL + "://" + LOCAL_URL_BASE; //full local url (with protocol)

export const PROD_URL_BASE = process.env.NEXT_PUBLIC_URL_BASE + (process.env.NEXT_PUBLIC_RUNNING_LOCAL === 'true' ? ":" + process.env.NEXT_PUBLIC_PORT : ""); //public url without protocol
export const PROD_URL = process.env.NEXT_PUBLIC_PROTOCOL + "://" + PROD_URL_BASE; //full public url (with protocol)