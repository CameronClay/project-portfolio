export enum Section {
    HOME             = 'Home',
    PROJECTS     = 'Projects',
    SKILLS         = 'Skills',
    // EXPERIENCE = 'Experience',
    CONTACT        = 'Contact',
}

//determines name of each section and what is appended to the url
export const LINKS = [
    {
        name: Section.HOME,
        link: '#home',
    },
    {
        name: Section.PROJECTS,
        link: '#projects',
    },
    {
        name: Section.SKILLS,
        link: '#skills',
    },
    // {
    //     name: Section.EXPERIENCE,
    //     link: '#experience',
    // },
    {
        name: Section.CONTACT,
        link: '#contact',
    },

] as const;

export const PROJECTS_DATA = [
    {
        title: 'Compiler',
        description:
            `- Converts source code into assembly code
             - Source code language is based on a hybrid of C# and C
             - Supports inheritance, polymorphism, and multithreading
            `,
        tags: ['C++', 'Assembly', 'CMake', 'Git'],
        previewImageUrl: '/assets/Preview_Compiler.png',
        fullImageUrl     : '/assets/Full_Compiler.png'
    },
    {
        title: 'Assembler and Virtual Machine',
        description:
            `- Converts assembly code into bytecode which can be run by the virtual machine
             - Based on Reduced Instruction Set Computer (RISC) instruction Set Architecture (ISA)
             - Supports multithreading
            `,
        tags: ['C++', 'Assembly', 'CMake', 'Git'],
        previewImageUrl: '/assets/Preview_ASM_VM.png',
        fullImageUrl     : '/assets/Full_ASM_VM.png'
    },
    {
        title: 'Client-server chat application',
        description:
            `- GUI based application similar to IRC, with the ability to connect to a chat server to send and receive messages from server members
             - Supports shared whiteboard
            `,
        tags: ['C++', 'Qt', 'Win32 API', 'CMake', 'WNLIB', 'Git'],
        previewImageUrl: '/assets/Preview_WNLIB_Client.png',
        fullImageUrl     : '/assets/Full_WNLIB_Client.png'
    },
    {
        title: 'TCP-IP networking library [WNLIB]',
        description:
            `- TCP networking library which served as the base for writing a Client-Server chat application
            `,
        tags: ['C++', 'Win32 API', 'CMake', 'IO Completion Ports (IOCP)', 'Git'],
        previewImageUrl: '/assets/Preview_WNLIB_Server.png',
        fullImageUrl     : '/assets/Full_WNLIB_Server.png'
    },
    {
        title: 'Type-erased function container library]',
        description:
            `- Library which enables the ability to conditionally call functions at compile time based on the parameters passed, and enables those functions to be stored in statically-typed containers (such as an array/vector/arraylist)
            `,
        tags: ['C++', 'Template metaprogramming', 'Git'],
        previewImageUrl: '/assets/Preview_FunctionAny.png',
        fullImageUrl     : '/assets/Full_FunctionAny.png'
    },
    {
        title: 'Discord bot',
        description:
            `- Elo bot for a SC2 arcade game, allows server members to join a queue to play against each other and
            generates a balanced team matchup based on player skill levels
            `,
        tags: ['Python', 'Discord.py', 'PostgreSQL', 'Git'],
        previewImageUrl: '/assets/Preview_HexBot.png',
        fullImageUrl     : '/assets/Full_HexBot.png'
    },
] as const;

export const SKILLS_DATA = [
    'C++',
    'C# with .NET',
    'Python',
    'C',
    'Rust',
    'Java',
    'SQL(MYSQL and PostgreSQL)',
    'Object Oriented Programming',
    'Debugging',
    'Git',
    'Atlassian',
    'Jira',
    'Docker',
    'Continous Integration/Continuous Deployment (CI/CD)',
    'Unit/Integration testing',
    'Visual Studio',
    'Visual Studio Code',
    'Windows',
    'Linux',
    'HTML',
    'CSS',
    'JavaScript',
    'Typescript',
    'CMake',
    'Qt'
] as const;