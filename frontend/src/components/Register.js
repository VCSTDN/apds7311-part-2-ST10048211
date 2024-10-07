import React, { useState } from 'react';

const Register = () => {
    const [fullName, setFullName] = useState('');
    const [idNumber, setIDNumber] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    // Password policy check function
    const isPasswordValid = (password) => {
        const passwordPolicy = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordPolicy.test(password);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Reset error state
        setError('');

        // Validate all fields
        if (!fullName) {
            setError('Full Name is required.');
            return;
        }
        if (idNumber.length !== 13) {
            setError('ID Number must be exactly 13 digits.');
            return;
        }
        if (!accountNumber) {
            setError('Account Number is required.');
            return;
        }
        if (!password) {
            setError('Password is required.');
            return;
        }
        if (!isPasswordValid(password)) {
            setError('Password must be at least 8 characters long, include uppercase, lowercase, numbers, and special characters.');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            const response = await fetch('https://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fullName,
                    idNumber,
                    accountNumber,
                    password,
                    confirmPassword,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Registered successfully!');
                window.location.href = '/login';
            } else {
                setError(data.errors ? data.errors[0].msg : 'Registration failed');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };

    // Handle change for ID Number input to ensure only digits and limit to 13 characters
    const handleIDNumberChange = (e) => {
        const value = e.target.value;
        // Only allow digits and limit length to 13
        if (/^\d*$/.test(value) && value.length <= 13) {
            setIDNumber(value);
        }
    };

    // Handle change for Account Number input to ensure only digits
    const handleAccountNumberChange = (e) => {
        const value = e.target.value;
        // Only allow digits
        if (/^\d*$/.test(value)) {
            setAccountNumber(value);
        }
    };

    return (
        <div className="form-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="ID Number"
                    value={idNumber}
                    onChange={handleIDNumberChange}
                    required
                />
                <input
                    type="text"
                    placeholder="Account Number"
                    value={accountNumber}
                    onChange={handleAccountNumberChange}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                {error && <p id="error" style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Register</button>
            </form>
            <p>Already have an account? <a href="/login">Login here</a></p>
        </div>
    );
};

export default Register;
