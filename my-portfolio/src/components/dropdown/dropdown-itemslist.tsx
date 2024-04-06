import React from 'react';

type DropdownItemsListProps = {
    classNameEtc?: string;
    children     : React.ReactNode;
}

export function DropdownItemsList({ classNameEtc, children }: DropdownItemsListProps) {
    let className = 'absolute right-[0rem] mt-[0.25rem] rounded-lg shadow-lg'
    if (classNameEtc){
        className = `${className} ${classNameEtc}`
    }

    return (
        <div className={className}>
            {
                //role: ARIA roles can be used to describe elements that don't natively exist in HTML or exist but don't yet have full browser support.
                //By default, many semantic elements in HTML have a role; for example, <input type="radio"> has the "radio" role.
            }
            <ul role='menu' aria-orientation='vertical' aria-labelledby='options-menu'>
                {children}
            </ul>
        </div>
    );
}