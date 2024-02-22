"use client";

import React from 'react';
import { BiSolidInfoCircle } from "react-icons/bi";
// import { Tooltip } from 'react-tooltip';
import { Tooltip, Button } from "@material-tailwind/react";

type InfoLabelProps = {
    text: string;
    tooltip: string;
    iconSize: number;
    iconStyle: string;
}

export default function InfoLabel({text, tooltip, iconSize, iconStyle} : InfoLabelProps) {
    return (
        <Tooltip content={tooltip}>
            <Button placeholder={text} className='inline underline'>
                {text}
                <BiSolidInfoCircle className={`inline ${iconStyle}`} size={iconSize}/>
            </Button>
        </Tooltip>
    )
}
