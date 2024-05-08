import '@testing-library/dom';
import { render, renderHook, screen } from '@testing-library/react';
import React from 'react';
import PublicAPI from '@src/app/api-info/public/page';
import MainLayout from '@src/layouts/main-layout';
import APIRootLayout from '@src/app/api-info/layout';

import '@src/jest/mocks';

describe('Public API Page', () => {
    it('render without errors', () => { //can be it or test
        render(
            <MainLayout>
                <APIRootLayout>
                    <PublicAPI />
                </APIRootLayout>
            </MainLayout>
        )
        expect.assertions(0);
    });
})
