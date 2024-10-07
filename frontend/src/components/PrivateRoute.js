import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');

    // Debugging: Console log the token value
    console.log('Token:', token);

    // If there's no token, redirect to login
    return token ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
