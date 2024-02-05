export enum Section {
    INFO   = 'INFO',
    API     = 'API',
}

//determines name of each section and what is appended to the url
export const LINKS = [
    {
        name: Section.INFO,
        link: '#info',
    },
    {
        name: Section.API,
        link: '#test-api',
    },
] as const;
