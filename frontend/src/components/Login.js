import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [idNumber, setIDNumber] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate that ID number has exactly 13 digits
        if (idNumber.length !== 13) {
            setError('Invalid Credentials.');
            return;
        }

        try {
            const response = await fetch('https://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    idNumber, 
                    accountNumber, 
                    password
                }),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Logged in successfully!');
                localStorage.setItem('token', data.token);
                navigate('/payment');
            } else {
                setError(data.errors ? data.errors[0].msg : 'Invalid credentials');
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
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
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
                <p id="error">{error}</p>
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <a href="/register">Register here</a></p>
        </div>
    );
};

export default Login;
