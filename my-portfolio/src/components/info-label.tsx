import React from 'react';
import { BiSolidInfoCircle } from "react-icons/bi";

type InfoLabelProps = {
    text: string;
    tooltip: string;
    iconSize: number;
    iconStyle: string;
}

export default function InfoLabel({text, tooltip, iconSize, iconStyle} : InfoLabelProps) {
  return (
    <span className='underline' title={tooltip}>{text} <BiSolidInfoCircle className={`inline ${iconStyle}`} size={iconSize}/></span>
  )
}
