import { render, screen, fireEvent } from '@testing-library/react';
import Register from '../src/components/Register'; // Adjust the import according to your structure

describe('Register Component', () => {
    // test('isPasswordValid returns true for valid password', () => {
    //     // Update this part based on your implementation
    //     const { result } = render(<Register />);
    //     const passwordValid = result.isPasswordValid('Valid123!');
    //     expect(passwordValid).toBe(true);
    // });

    test('displays error message for empty full name', () => {
        render(<Register />);
        fireEvent.click(screen.getByRole('button', { name: /register/i }));
        expect(screen.getByText(/Full Name is required/i)).toBeInTheDocument();
    });

   
});
