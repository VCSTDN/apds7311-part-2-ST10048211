import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./Payment.css";

const Payment = () => {
  const navigate = useNavigate();

  const [recipientAccountNumber, setRepAccNumber] = useState('');
  const [recipientBankName, setRepBankName] = useState('');
  const [recipientAccOwnerName, setRepAccOwnerName] = useState('');
  const [accountType, setAccType] = useState('');
  const [swiftCode, setSwiftCode] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('');
  const [bankName, setBankName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');

      // Make sure the token is available
      if (!token) {
        setError('User is not authenticated. Please log in.');
        return;
      }

      const response = await fetch('https://localhost:5000/api/payment', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipientAccountNumber,
          recipientBankName,
          recipientAccOwnerName,
          accountType,
          swiftCode,
          amount,
          currency,
          bankName,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        
        setSuccess('Payment completed successfully!');
        alert('Payment completed successfully!');
          // Reset the form fields
          setRepAccNumber('');
          setRepBankName('');
          setRepAccOwnerName('');
          setAccType('');
          setSwiftCode('');
          setAmount('');
          setCurrency('');
          setBankName('');
      } else {
        setError(data.errors ? data.errors[0].msg : 'Invalid data');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  const handleLogout = () => {
    // Clear token and navigate to login page
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="payment-form-container">
      <h2>Account and Payment Information</h2>
      <form onSubmit={handleSubmit}>
        {/* Account Information Section */}
        <fieldset>
          <legend>Account Information</legend>

          <label htmlFor="recipientAccountNumber">Account Number</label>
          <input
            type="text"
            id="recipientAccountNumber"
            name="recipientAccountNumber"
            value={recipientAccountNumber}
            onChange={(e) => setRepAccNumber(e.target.value)}
            placeholder="Enter your account number"
            required
          />

          <label htmlFor="recipientBankName">Bank</label>
          <select
            id="recipientBankName"
            name="recipientBankName"
            value={recipientBankName}
            onChange={(e) => setRepBankName(e.target.value)}
            required
          >
            <option value="">Select your bank</option>
            <option value="absa">ABSA</option>
            <option value="fnb">FNB (First National Bank)</option>
            <option value="nedbank">Nedbank</option>
            <option value="standard_bank">Standard Bank</option>
            <option value="capitec">Capitec Bank</option>
          </select>

          <label htmlFor="recipientAccOwnerName">Account Owner's Name</label>
          <input
            type="text"
            id="recipientAccOwnerName"
            name="recipientAccOwnerName"
            value={recipientAccOwnerName}
            onChange={(e) => setRepAccOwnerName(e.target.value)}
            placeholder="Enter the name of the account owner"
            required
          />

          <label htmlFor="accountType">Type of Account</label>
          <select
            id="accountType"
            name="accountType"
            value={accountType}
            onChange={(e) => setAccType(e.target.value)}
            required
          >
            <option value="">Select account type</option>
            <option value="savings">Savings Account</option>
            <option value="checking">Checking Account</option>
            <option value="business">Business Account</option>
          </select>

          <label htmlFor="swiftCode">SWIFT Code</label>
          <input
            type="text"
            id="swiftCode"
            name="swiftCode"
            value={swiftCode}
            onChange={(e) => setSwiftCode(e.target.value)}
            placeholder="Enter the SWIFT code"
            required
          />
        </fieldset>

        {/* Payment Information Section */}
        <fieldset>
          <legend>Payment Information</legend>

          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter the amount"
            required
          />

          <label htmlFor="currency">Currency</label>
          <select
            id="currency"
            name="currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            required
          >
            <option value="">Select a currency</option>
            <option value="ZAR">ZAR - South African Rand</option>
            <option value="USD">USD - US Dollar</option>
            <option value="EUR">EUR - Euro</option>
          </select>

          <label htmlFor="bankName">Bank</label>
          <select
            id="bankName"
            name="bankName"
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
            required
          >
            <option value="">Select your bank</option>
            <option value="absa">ABSA</option>
            <option value="fnb">FNB (First National Bank)</option>
            <option value="nedbank">Nedbank</option>
            <option value="standard_bank">Standard Bank</option>
            <option value="capitec">Capitec Bank</option>
          </select>
        </fieldset>


        {error && <p id="error" style={{ color: 'red' }}>{error}</p>}
        {success && <p id="success" style={{ color: 'green' }}>{success}</p>}
        {/* Submit Button */}
        <button type="submit">Pay Now</button>
      </form>

      {/* Logout Button */}
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Payment;
