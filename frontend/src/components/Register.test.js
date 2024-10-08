import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import Register from './Register';

describe('Register Component', () => {
    test('displays error message when Full Name is empty', () => {
        render(<Register />);
        fireEvent.click(screen.getByRole('button', { name: /register/i }));
        expect(screen.getByText('Full Name is required.')).toBeInTheDocument();
    });

    test('displays error message for ID Number not being exactly 13 digits', () => {
        render(<Register />);
        fireEvent.change(screen.getByPlaceholderText('Full Name'), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByPlaceholderText('ID Number'), { target: { value: '123' } });
        fireEvent.click(screen.getByRole('button', { name: /register/i }));
        expect(screen.getByText('ID Number must be exactly 13 digits.')).toBeInTheDocument();
    });

    test('displays error message when passwords do not match', () => {
        render(<Register />);
        fireEvent.change(screen.getByPlaceholderText('Full Name'), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByPlaceholderText('ID Number'), { target: { value: '1234567890123' } });
        fireEvent.change(screen.getByPlaceholderText('Account Number'), { target: { value: '123456789' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'Valid123!' } });
        fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'Invalid123!' } });
        fireEvent.click(screen.getByRole('button', { name: /register/i }));
        expect(screen.getByText('Passwords do not match.')).toBeInTheDocument();
    });

    test('displays error message for invalid password', () => {
        render(<Register />);
        fireEvent.change(screen.getByPlaceholderText('Full Name'), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByPlaceholderText('ID Number'), { target: { value: '1234567890123' } });
        fireEvent.change(screen.getByPlaceholderText('Account Number'), { target: { value: '123456789' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'short' } });
        fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'short' } });
        fireEvent.click(screen.getByRole('button', { name: /register/i }));
        expect(screen.getByText(/Password must be at least 8 characters long, include uppercase, lowercase, numbers, and special characters/)).toBeInTheDocument();
    });

    // test('submits the form when all fields are valid', async () => {
    //     render(<Register />);
    //     fireEvent.change(screen.getByPlaceholderText('Full Name'), { target: { value: 'John Doe' } });
    //     fireEvent.change(screen.getByPlaceholderText('ID Number'), { target: { value: '1234567890123' } });
    //     fireEvent.change(screen.getByPlaceholderText('Account Number'), { target: { value: '123456789' } });
    //     fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'Valid123!' } });
    //     fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'Valid123!' } });
    //     fireEvent.click(screen.getByRole('button', { name: /register/i }));

    //     // Assuming success results in a redirect, you might check if a window location change happens
    //     expect(window.location.href).toContain('/login');
    // });

    
});
