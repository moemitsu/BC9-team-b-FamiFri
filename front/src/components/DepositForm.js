// src/components/DepositForm.js
import { useState } from 'react';
import axios from 'axios';

const DepositForm = () => {
  const [amount, setAmount] = useState('');
  const [fromAccount, setFromAccount] = useState('');
  const [toAccount, setToAccount] = useState('');

  const handleDeposit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/deposit', {
        amount,
        fromAccount,
        toAccount
      });

      console.log('Deposit successful:', response.data);
    } catch (error) {
      console.error('Error making deposit:', error.response.data);
    }
  };

  return (
    <form onSubmit={handleDeposit}>
      <h2>Deposit Money</h2>
      <input
        type="text"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        type="text"
        placeholder="From Account"
        value={fromAccount}
        onChange={(e) => setFromAccount(e.target.value)}
      />
      <input
        type="text"
        placeholder="To Account"
        value={toAccount}
        onChange={(e) => setToAccount(e.target.value)}
      />
      <button type="submit">Deposit</button>
    </form>
  );
};

export default DepositForm;
