'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

//Set of links to display within an APIEndpointForm
export default function EndpointLinks() {
    const pathname = usePathname();

    return (
        <div className="">
            <Link
                title="Login"
                href={`/account/login?redirect=${pathname}`}
                target="_parent"
                className="block link text-xl font-bold"
            >
                Login
            </Link>

            <Link
                title="Register"
                href={`/account/register?redirect=${pathname}`}
                target="_parent"
                className="block link text-xl font-bold"
            >
                Register
            </Link>
        </div>
    );
}
