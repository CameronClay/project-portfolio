export const EMAIL_INFO = {
    to: 'cameronpclay@gmail.com',
} as const;

export const EMAIL_FORM_INFO = {
    name: {
        maxLength: 100,
    },
    email_address: {
        maxLength: 320, //320 is max email length
    },
    message: {
        maxLength: 5000,
    },
} as const;