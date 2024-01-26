export enum Section {
    INTRO   = 'INTRO',
    API     = 'API',
}

//determines name of each section and what is appended to the url
export const LINKS = [
    {
        name: Section.INTRO,
        link: '#intro',
    },
    {
        name: Section.API,
        link: '#test-api',
    },
] as const;
