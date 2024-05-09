'use server'; //makes code run on the server only (applies to everything in this module)

import nodemailer from 'nodemailer';
import { render } from '@react-email/render';
import { validate_input, get_error_message } from '@src/lib/utils/validation';
import ContactMeEmail from '@src/components/contact-me-email';
import {
    EMAIL_FORM_INFO,
    EMAIL_INFO,
} from '@src/constants/home/email-constants';

//builds email data from form data
function build_emaildata_from_formdata(formData: FormData) {
    const senderName = formData.get('inputSenderName') as string | null;
    const senderEmail = formData.get('inputSenderEmail') as string | null;
    const message = formData.get('textAreaMessage') as string | null;

    return {
        senderName,
        senderEmail,
        message,
    };
}

type ValidateEmailDataProps = {
    senderName: string | null;
    senderEmail: string | null;
    message: string | null;
};

//server side validation of email info
function validate_email_data({
    senderName,
    senderEmail,
    message,
}: ValidateEmailDataProps) {
    if (!validate_input(senderName, EMAIL_FORM_INFO.name.maxLength)) {
        return {
            error: 'Invalid sender name',
        };
    }
    if (!validate_input(senderEmail, EMAIL_FORM_INFO.email_address.maxLength)) {
        return {
            error: 'Invalid sender email',
        };
    }
    if (!validate_input(message, EMAIL_FORM_INFO.message.maxLength)) {
        return {
            error: 'Invalid message',
        };
    }

    return {
        valid: true,
    };
}

export const send_email = async (formData: FormData, url: string) => {
    const emailData = build_emaildata_from_formdata(formData);
    const { valid, error } = validate_email_data(emailData);

    if (!valid) {
        return {
            error: error,
        };
    }
    // return new Promise(sendMailHelper(emailData));
    // const ReactDOMServer = (await import('react-dom/server')).default; //dynamic import to get around needing use client for ReactDOMServer.renderToString

    return new Promise<{ error?: string; data?: object }>((resolve, reject) => {
        const mailData = {
            from: `${emailData.senderName as string} <${process.env.SMTP_FROM}>`,
            to: `${EMAIL_INFO.to}`,
            replyTo: `${emailData.senderName as string} <${emailData.senderEmail as string}>`,
            subject: `Contact form message ${url}`,
            text: 'message',
            html: render(
                ContactMeEmail({
                    senderName: emailData.senderName as string,
                    senderEmail: emailData.senderEmail as string, //senderEmail cannot be null because of server side validation
                    message: emailData.message as string, //message cannot be null because of server side validation
                })
            ),
            // html: ReactDOMServer.renderToString(React.createElement(ContactFormEmail, { //cannot access DOM on a server component
            //     senderName: emailData.senderName as string,
            //     senderEmail: emailData.senderEmail as string, //senderEmail cannot be null because of server side validation
            //     message: emailData.message as string, //message cannot be null because of server side validation
            // }))
        };

        const smtpSettings = {
            host: process.env.SMTP_HOST as string,
            port: Number(process.env.SMTP_PORT as string),
            auth: {
                user: process.env.SMTP_USER as string,
                pass: process.env.SMTP_PASSWORD as string,
            },
        };

        const transporter = nodemailer.createTransport(smtpSettings);
        transporter.sendMail(mailData, (error, data) => {
            if (error) {
                resolve({
                    error: get_error_message(error),
                });
            } else {
                resolve({
                    data: {
                        response: data.response,
                    },
                });
            }
        });
    });
};

// const resend = new Resend(process.env.RESEND_API_KEY);

//this is a server action (new in Next.js)
//dont need to create a separate api (Next.js takes care of it)
// export const sendEmail = async (formData : FormData, url : string) => {
//     const emailData = buildEmailDataFromFormData(formData);
//     const {valid, error} = validateEmailData(emailData);

//     if(!valid) {
//         return {
//             error
//         }
//     }

//     let data : Awaited<ReturnType<typeof resend.emails.send>>;
//     try {
//         data = await resend.emails.send({
//             from: `Contact Form <${EMAIL_INFO.from}>`,
//             to: EMAIL_INFO.to,
//             subject: `Contact Form@${url}`,
//             reply_to: emailData.senderEmail as string,
//             // react: <ContactFormEmail message={message} senderEmail={senderEmail} /> //requires jsx (e.g. extension .tsx)
//             // text: message as string //not possible to be null because of server side validation
//             react: React.createElement(ContactFormEmail, {
//                 senderName: emailData.senderName as string,
//                 senderEmail: emailData.senderEmail as string, //senderEmail cannot be null because of server side validation
//                 message: emailData.message as string, //message cannot be null because of server side validation
//             })
//         })
//     }
//     catch (error : unknown) {
//         return {
//             error: getErrorMessage(error),
//         }
//     }

//     return {
//         data,
//     }
// }