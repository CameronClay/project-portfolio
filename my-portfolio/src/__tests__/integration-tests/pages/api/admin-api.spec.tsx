// // import '@testing-library/jest-dom';
// // import { render, renderHook, screen } from '@testing-library/react';
// // import React from 'react';
// // import AdminAPI from '@src/app/api-info/admin/page';

// // // jest.mock('src/context/api/api-endpoint-context')
// // // jest.mock('src/context/api/context-provider-element')
// // // jest.mock('src/lib/hooks');

// // describe('Admin API Page', () => {
// //     it('render without errors', () => { //can be it or test
// //         // renderHook(() => <AdminAPI />);
// //         // rerender(() => <AdminAPI />);
// //         render(<AdminAPI />);

// //         let elem = screen.getByText('API');
// //         expect(elem).toBeInTheDocument();
// //     });
// // })

// import '@testing-library/jest-dom';
// import { render, renderHook, screen } from '@testing-library/react';
// import React from 'react';
// import AdminAPI from '@src/app/api-info/admin/page';
// import RootLayout from '@src/app/layout';
// import APIRootLayout from '@src/app/api-info/layout';

// describe('Public API Page', () => {
//     it('render without errors', () => { //can be it or test
//         render(
//             <RootLayout>
//                 <APIRootLayout>
//                     <AdminAPI/>
//                 </APIRootLayout>
//             </RootLayout>
//         )
//     });
// })