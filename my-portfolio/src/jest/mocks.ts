//not necessary with custom test environment replacing jsdom version of fetch and Response with node.js version
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
global.Response.json = jest.fn().mockImplementation((data: any, init?: ResponseInit | undefined) => {
    /* eslint-disable-next-line @typescript-eslint/no-unsafe-argument */
    // return new Response(data, init);
    return new Response(JSON.stringify(data), init);
});


//mock log_ext to remove logfare logging
jest.mock('@src/lib/utils/log-utils', () => {
    /* eslint-disable-next-line @typescript-eslint/no-unsafe-return */
    return {
        ...jest.requireActual('@src/lib/utils/log-utils'),

        /* eslint-disable-next-line @typescript-eslint/require-await */
        log_ext: async (message: string) => {
            console.log(message);
        },
    };
});

jest.mock('next/navigation', () => {
    /* eslint-disable-next-line @typescript-eslint/no-unsafe-return */
    return {
        ...jest.requireActual('next/navigation'),
        useRouter: jest.fn().mockImplementation(() => ({ route: '/' })),
        useSearchParams: jest.fn().mockImplementation(() => ({ get: jest.fn().mockImplementation((param: string) => '/api') }))
    };
});

jest.mock('react-dom', () => {
    /* eslint-disable-next-line @typescript-eslint/no-unsafe-return */
    return {
        ...jest.requireActual('react-dom'),
        useFormStatus: jest.fn().mockImplementation(() => ({ pending: false }))
    };
});

jest.mock('react-intersection-observer', () => {
    /* eslint-disable-next-line @typescript-eslint/no-unsafe-return */
    return {
        ...jest.requireActual('react-intersection-observer'),
        useInView: jest.fn().mockImplementation(() => ({ threshold: 0.1 }))
    };
});

//JSDOM doesnt implement matchMedia need to mock it manually
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query /* eslint-disable-line @typescript-eslint/no-unsafe-assignment */,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
});

class MockedIntersectionObserver {
    observe = jest.fn()
    disconnect = jest.fn()
    unobserve = jest.fn()
}

Object.defineProperty(window, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: MockedIntersectionObserver,
})

Object.defineProperty(global, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: MockedIntersectionObserver,
})