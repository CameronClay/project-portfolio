import React from 'react';

import {
    Html,
    Heading,
    Head,
    Hr,
    Body,
    Preview,
    Section,
    Text,
    Link,
    Container,
} from '@react-email/components';

import { Tailwind } from '@react-email/tailwind'; //Tailwind necessary in order to use tailwind with react-email

type ContactMeEmailProps = {
    senderName: string;
    senderEmail: string;
    message: string;
};

export default function ContactMeEmail({
    senderName,
    senderEmail,
    message,
}: ContactMeEmailProps) {
    return (
        <Html>
            <Head />
            <Preview>Porfolio website message</Preview>

            {
                //Tailwind componenent necessary in order to use tailwind with react-email
                //Hr is horizontal line
            }
            <Tailwind>
                <Body className="text-black bg-slate-200">
                    <Container>
                        <Section className="bg-white borderBlack my-[2.5rem] px-[2.5rem] py-[1rem] rounded-md">
                            <Heading className="leading-[1.2] font-semibold">
                                {senderName}
                                <Text className="inline font-normal text-lg">
                                    {' '}
                                    sent you the following message using the
                                    contact form.
                                </Text>
                            </Heading>
                            <Text className="">{message}</Text>
                            <Hr />
                            <Text>
                                Sent by:{' '}
                                <Link
                                    href={`mailto:${senderName}<${senderEmail}>`}
                                    className="font-bold"
                                >
                                    {senderEmail}
                                </Link>
                            </Text>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
}
