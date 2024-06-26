'use client';

import React from 'react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { useSectionInView } from '@src/lib/hooks';
import { send_email } from '@src/server-actions/send-email';
import {
    EMAIL_FORM_INFO,
    EMAIL_INFO,
} from '@src/constants/home/email-constants';
import { Section } from '@src/constants/home/section-data';
import SectionHeading from '@src//components/home/components/section-heading';
import SubmitBtn from '@src/components/submit-btn';

export default function Contact() {
    const { ref } = useSectionInView(Section.CONTACT);
    const url = process.env.NEXT_PUBLIC_URL_BASE as string;
    const onAction = async (formData: FormData) => {
        const { data, error } = await send_email(formData, url);
        if (error) {
            toast.error(error);
            return;
        }

        toast.success('Email sent successfully!');
    };

    return (
        //do a fade in animation first time this section comes into view
        <motion.section
            id="contact"
            ref={ref}
            className="mb-[5rem] sm:mb-[7rem] w-[min(100%,38rem)] text-center transition"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
        >
            <SectionHeading>Contact me</SectionHeading>

            {
                //negative margin to reduce space between SectionHeading and paragraph
            }
            <p className="text-gray-700 -mt-[1.5rem] dark:text-white/80 transition">
                Please contact me at{' '}
                <a className="underline" href={`mailto:${EMAIL_INFO.to}`}>
                    {EMAIL_INFO.to}
                </a>{' '}
                or by using the form below.
            </p>

            {
                //action that takes function only exists in Next.js
                //solve https://github.com/orgs/react-hook-form/discussions/8622
            }
            <form
                className="mt-[2.0rem] flex flex-col dark:text-black transition"
                action={(event) => void onAction(event)}
            >
                <p className="text-left mb-[1rem] font-semibold italic text-gray-700 dark:text-white/80 transition">
                    An asterisk (<span className="font-bold">*</span>) indicates
                    a required field
                </p>

                {
                    //html5 input elements
                }
                <label className="flex flex-col emailLabel">
                    <p>
                        Name: <span className="font-bold">*</span>
                    </p>
                    <input
                        name="inputSenderName"
                        type="text"
                        required={true}
                        maxLength={EMAIL_FORM_INFO.name.maxLength}
                        className="h-[3.5rem] mb-[0.625rem] p-[0.75rem] emailInput group"
                    />
                </label>

                <label className="flex flex-col emailLabel">
                    <p>
                        Email: <span className="font-bold">*</span>
                    </p>
                    <input
                        name="inputSenderEmail"
                        type="email"
                        required={true}
                        maxLength={EMAIL_FORM_INFO.email_address.maxLength}
                        className="h-[3.5rem] mb-[0.625rem] p-[0.75rem] emailInput"
                    />
                </label>

                <label className="flex flex-col emailLabel">
                    <p>
                        Message: <span className="font-bold">*</span>
                    </p>
                    <textarea
                        name="textAreaMessage"
                        required={true}
                        maxLength={EMAIL_FORM_INFO.message.maxLength}
                        className="h-[13rem] mb-[0.5rem] p-[0.75rem] emailInput"
                    />
                </label>
                <SubmitBtn text="Send" />
            </form>
        </motion.section>
    );
}