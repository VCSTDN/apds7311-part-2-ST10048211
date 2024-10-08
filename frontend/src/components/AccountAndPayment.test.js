import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Payment from './AccountAndPayment';

// Mock the useNavigate hook from react-router-dom
const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
}));

describe('Payment Component', () => {
    beforeEach(() => {
        // Clear all mocks before each test
        jest.clearAllMocks();
    });

    test('renders the payment form correctly', () => {
        render(
            <BrowserRouter>
                <Payment />
            </BrowserRouter>
        );

        expect(screen.getByText('Account and Payment Information')).toBeInTheDocument();
        expect(screen.getByText("Account Owner's Name")).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /pay now/i })).toBeInTheDocument();
    });

    // test('displays error if user is not authenticated', () => {
    //     render(
    //         <BrowserRouter>
    //             <Payment />
    //         </BrowserRouter>
    //     );

    //     const submitButton = screen.getByRole('button', { name: /pay now/i });
    //     fireEvent.click(submitButton);

    //     expect(screen.getByText('User is not authenticated. Please log in.')).toBeInTheDocument();
    // });

    // test('successful payment alert and token validation', async () => {
    //     // Mock the token and fetch API response
    //     localStorage.setItem('token', 'validToken');
    //     global.fetch = jest.fn(() =>
    //         Promise.resolve({
    //             ok: true,
    //             json: () => Promise.resolve({}),
    //         })
    //     );

    //     render(
    //         <BrowserRouter>
    //             <Payment />
    //         </BrowserRouter>
    //     );

    //     const accountOwnerInput = screen.getByLabelText("Account Owner's Name");
    //     const submitButton = screen.getByRole('button', { name: /pay now/i });

    //     fireEvent.change(accountOwnerInput, { target: { value: 'John Doe' } });
    //     fireEvent.click(submitButton);

    //     expect(await screen.findByText('Payment completed successfully!')).toBeInTheDocument();
    // });

    // test('displays error when API call fails', async () => {
    //     localStorage.setItem('token', 'validToken');
    //     global.fetch = jest.fn(() =>
    //         Promise.resolve({
    //             ok: false,
    //             json: () => Promise.resolve({ errors: [{ msg: 'Invalid data' }] }),
    //         })
    //     );

    //     render(
    //         <BrowserRouter>
    //             <Payment />
    //         </BrowserRouter>
    //     );

    //     const submitButton = screen.getByRole('button', { name: /pay now/i });
    //     fireEvent.click(submitButton);

    //     expect(await screen.findByText('Invalid data')).toBeInTheDocument();
    // });
});
