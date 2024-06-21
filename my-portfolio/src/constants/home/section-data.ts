import { SectionType } from '@src/constants/section-type';

export enum Section {
    INFO = 'Info',
    PROJECTS = 'Projects',
    SKILLS = 'Skills',
    // EXPERIENCE     = 'Experience',
    CONTACT = 'Contact',
}

//determines name of each section and what is appended to the url
export const LINKS = [
    {
        name: Section.INFO,
        link: '#info',
    } as SectionType,
    {
        name: Section.PROJECTS,
        link: '#projects',
    } as SectionType,
    {
        name: Section.SKILLS,
        link: '#skills',
    } as SectionType,
    // {
    //     name: Section.EXPERIENCE,
    //     link: '#experience',
    // } as SectionType,
    {
        name: Section.CONTACT,
        link: '#contact',
    } as SectionType,
] as const;

export const SKILLS_DATA = [
    'C++',
    'C# with .NET',
    'Python',
    'C',
    'Java',
    'Rust',
    'REST APIs',
    'SQL (MYSQL and PostgreSQL)',
    'NoSQL',
    'TypeScript',
    'JavaScript',
    'HTML',
    "XML",
    'CSS',
    'Docker',
    'Git',
    'Atlassian',
    'Jira',
    'Continous Integration/Continuous Deployment (CI/CD)',
    'Bitbucket Pipelines',
    'GitHub Actions',
    'Jenkins',
    'Unit testing',
    'Integration testing',
    'Linux',
    'Windows',
    'CMake',
    'Boost C++ libraries',
    'Qt',
    'Visual Studio',
    'Visual Studio Code',
    'Object Oriented Programming',
    'Debugging',
    'Programming principles',
    'Software design patterns',
    'Customer service'
] as const;

export type Skill = (typeof SKILLS_DATA)[number];

export const PROJECTS_DATA = [
    {
        title: 'Compiler',
        description: `- Converts source code into assembly code
             - Source code language is based on a hybrid of C# and C
             - Supports inheritance, polymorphism, and multithreading
            `,
        topSkills: ['C++ 20', 'STL', 'Boost C++ libraries', 'Google Test', 'Assembly'],
        otherSkills: ['Git', 'CMake', 'vcpkg'],
        previewImageUrl: '/assets/Preview_Compiler.png',
        fullImageUrl: '/assets/Full_Compiler.png',
    },
    {
        title: 'Assembler and Virtual Machine',
        description: `- Converts assembly code into bytecode which can be run by the virtual machine
             - Based on Reduced Instruction Set Computer (RISC) instruction Set Architecture (ISA)
             - Supports multithreading
            `,
        topSkills: ['C++ 20', 'STL', 'Boost C++ libraries', 'Google Test', 'Assembly'],
        otherSkills: ['Git', 'CMake', 'vcpkg'],
        previewImageUrl: '/assets/Preview_ASM_VM.png',
        fullImageUrl: '/assets/Full_ASM_VM.png',
    },
    {
        title: 'Client-server chat application',
        description: `- GUI based application similar to IRC, with the ability to connect to a chat server to send and receive messages from server members
             - Supports shared whiteboard
            `,
        topSkills: ['C++', 'STL', 'Qt', 'Win32 API', 'Google Test'],
        otherSkills: ['WNLIB', 'Git', 'CMake', 'vcpkg', 'zlib'],
        previewImageUrl: '/assets/Preview_WNLIB_Client.png',
        fullImageUrl: '/assets/Full_WNLIB_Client.png',
    },
    {
        title: 'TCP-IP networking library [WNLIB]',
        description: `- TCP networking library which served as the base for writing a Client-Server chat application
            `,
        topSkills: ['C++', 'STL', 'Google Test', 'Win32 API'],
        otherSkills: ['IO Completion Ports (IOCP)', 'Git', 'CMake', 'vcpkg'],
        previewImageUrl: '/assets/Preview_WNLIB_Server.png',
        fullImageUrl: '/assets/Full_WNLIB_Server.png',
    },
    {
        title: 'Dynamic functions library',
        description: `- Library which enables the ability to conditionally call functions at compile time based on the parameters passed, and enables those functions to be stored in statically-typed containers (such as an array/vector/arraylist)
            `,
        topSkills: ['C++ 17', 'STL', 'Google Test', 'Template metaprogramming'],
        otherSkills: ['Git', 'Visual Studio'],
        previewImageUrl: '/assets/Preview_FunctionAny.png',
        fullImageUrl: '/assets/Full_FunctionAny.png',
    },
    {
        title: 'Discord bot',
        description: `- Elo bot for a Starcraft 2 arcade game, allows server members to join a queue to play against each other and
            generates a balanced team matchup based on player skill levels
            `,
        topSkills: ['Python', 'Discord.py', 'PostgreSQL', 'pytest'],
        otherSkills: ['Git'],
        previewImageUrl: '/assets/Preview_HexBot.png',
        fullImageUrl: '/assets/Full_HexBot.png',
    },
] as const;