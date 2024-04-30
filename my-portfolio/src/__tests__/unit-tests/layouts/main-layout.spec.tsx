import { render, renderHook, screen } from '@testing-library/react';
import React from 'react';
import MainLayout from '@src/layouts/main-layout';

describe('Main Layout', () => {
    //can be it or test
    it('render without errors', () => {
        render(<MainLayout />);
    });
});
