import { render, screen, fireEvent } from '@testing-library/react';
import Register from '../src/components/Register'; // Adjust the import according to your structure
import { isPasswordValid } from '../src/components/Register'

describe('Register Component', () => {
    test('displays error message for empty full name', () => {
        render(<Register />);
        fireEvent.click(screen.getByRole('button', { name: /register/i }));
        expect(screen.getByText(/Full Name is required/i)).toBeInTheDocument();
    });

    test('isPasswordValid returns true for a valid password', () => {
        const validPassword = 'Valid123!';
        const result = isPasswordValid(validPassword);
        expect(result).toBe(true);
    });

    test('isPasswordValid returns false for a invalid password', () => {
        const invalidPassword = 'pass';
        const result = isPasswordValid(invalidPassword);
        expect(result).toBe(false);
    });

   
});
