import { SectionType } from '@src/constants/section-type';

export enum Section {
    INFO = 'Info',
    API = 'API',
}

//determines name of each section and what is appended to the url
export const LINKS = [
    {
        name: Section.INFO,
        link: '#info',
    } as SectionType,
    {
        name: Section.API,
        link: '#api',
    } as SectionType,
] as const;
