import '@testing-library/jest-dom';
import { render, renderHook, screen } from '@testing-library/react';
import React from 'react';
import MainLayout from '@src/layouts/main-layout';

describe('Main Layout', () => {
    it('render without errors', () => {
        //can be it or test
        render(<MainLayout />);
    });
});
