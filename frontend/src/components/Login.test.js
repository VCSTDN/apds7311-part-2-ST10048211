import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from './Login';

// Mock the useNavigate hook from react-router-dom
const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
}));

describe('Login Component', () => {
    beforeEach(() => {
        // Clear all mocks before each test
        jest.clearAllMocks();
    });

    test('renders the login form correctly', () => {
        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        expect(screen.getByPlaceholderText('ID Number')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Account Number')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    });

    test('shows error message if ID number is not 13 digits', () => {
        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        const idInput = screen.getByPlaceholderText('ID Number');
        const submitButton = screen.getByRole('button', { name: /login/i });

        fireEvent.change(idInput, { target: { value: '123' } });
        fireEvent.click(submitButton);

        expect(screen.getByText('Invalid Credentials.')).toBeInTheDocument();
    });

    // test('successful login redirects to the payment page', async () => {
    //     // Mock the fetch API response
    //     global.fetch = jest.fn(() =>
    //         Promise.resolve({
    //             ok: true,
    //             json: () => Promise.resolve({ token: 'fakeToken' }),
    //         })
    //     );

    //     render(
    //         <BrowserRouter>
    //             <Login />
    //         </BrowserRouter>
    //     );

    //     const idInput = screen.getByPlaceholderText('ID Number');
    //     const accountInput = screen.getByPlaceholderText('Account Number');
    //     const passwordInput = screen.getByPlaceholderText('Password');
    //     const submitButton = screen.getByRole('button', { name: /login/i });

    //     fireEvent.change(idInput, { target: { value: '1234567890123' } });
    //     fireEvent.change(accountInput, { target: { value: '12345678' } });
    //     fireEvent.change(passwordInput, { target: { value: 'password' } });

    //     fireEvent.click(submitButton);

    //     // Wait for the navigation to happen
    //     expect(mockedUsedNavigate).toHaveBeenCalledWith('/payment');
    // });

    test('displays error if API call fails', async () => {
        // Mock the fetch API response
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: false,
                json: () => Promise.resolve({ errors: [{ msg: 'Invalid credentials' }] }),
            })
        );

        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        const idInput = screen.getByPlaceholderText('ID Number');
        const accountInput = screen.getByPlaceholderText('Account Number');
        const passwordInput = screen.getByPlaceholderText('Password');
        const submitButton = screen.getByRole('button', { name: /login/i });

        fireEvent.change(idInput, { target: { value: '1234567890123' } });
        fireEvent.change(accountInput, { target: { value: '12345678' } });
        fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });

        fireEvent.click(submitButton);

        expect(await screen.findByText('Invalid credentials')).toBeInTheDocument();
    });
});
