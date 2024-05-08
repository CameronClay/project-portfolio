'use client';

import React from 'react';
import { useResponseTextContext } from '@src/context/response-text-context';

//displays form response within an ResponseTextContextProvider
export default function APIEndpointResponse() {
    const { response_text } = useResponseTextContext();

    return (
        <div>
            {
                //undefined and null are the same in typescript
                response_text !== undefined && response_text.length > 0 ? (
                    <div className="flex flex-col justify-start">
                        <p>Response:</p>
                        <p className="borderBlack100 text-wrap whitespace-pre-wrap break-words">
                            {response_text}
                        </p>
                    </div>
                ) : null
            }
        </div>
    );
}