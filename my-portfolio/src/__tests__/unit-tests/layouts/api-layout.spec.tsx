import { render, renderHook, screen } from '@testing-library/react';
import React from 'react';
import APILayout from '@src/layouts/api-layout';

import '@src/jest/jest-mocks';

describe('API Layout', () => {
    //can be it or test
    it('render without errors', () => {
        render(<APILayout />);
        expect.assertions(0);
    });
});
