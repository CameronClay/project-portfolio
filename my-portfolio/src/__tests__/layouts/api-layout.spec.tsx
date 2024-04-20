import '@testing-library/jest-dom';
import { render, renderHook, screen } from '@testing-library/react';
import React from 'react';
import APILayout from '@src/layouts/api-layout';

describe('API Layout', () => {
    //JSDOM doesnt implement matchMedia need to mock it manually
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
          matches: false,
          media: query,
          onchange: null,
          addListener: jest.fn(), // Deprecated
          removeListener: jest.fn(), // Deprecated
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        })),
    });

    it('render without errors', () => { //can be it or test
        render(
            <APILayout/>
        )
    });
})