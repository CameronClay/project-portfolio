import { render, renderHook, screen } from '@testing-library/react';
import React from 'react';
import Home from '@src/app/page';
import MainLayout from '@src/layouts/main-layout';

describe('Home Page', () => {
    it('render without errors', () => { //can be it or test
        // render(<Home />);
        render(
            <MainLayout>
                <Home />
            </MainLayout>
        );

        let elem = screen.getByText('About Me');
        expect(elem).toBeInTheDocument();

        elem = screen.getByText('My Projects');
        expect(elem).toBeInTheDocument();

        elem = screen.getByText('My Skills');
        expect(elem).toBeInTheDocument();

        elem = screen.getByText('Contact Me');
        expect(elem).toBeInTheDocument();
    });
})
