import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import './styles.css';

const Login = () => {
    const [idNumber, setIDNumber] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

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

    return (
        <div className="form-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="ID Number" value={idNumber} onChange={(e) => setIDNumber(e.target.value)} required />
                <input type="text" placeholder="Account Number" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <p id="error">{error}</p>
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <a href="/register">Register here</a></p>
        </div>
    );
};

export default Login;
