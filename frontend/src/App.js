import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Payment from './components/AccountAndPayment';
import PrivateRoute from './components/PrivateRoute';
import './styles.css'; 

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                {/* Protect the payment route */}
                <Route
                    path="/payment"
                    element={
                        <PrivateRoute>
                            <Payment />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
