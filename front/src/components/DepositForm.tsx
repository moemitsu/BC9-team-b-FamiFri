import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

const DepositForm: React.FC = () => {
  const [amount, setAmount] = useState<string>('');
  const [fromAccount, setFromAccount] = useState<string>('');
  const [toAccount, setToAccount] = useState<string>('');

  const handleDeposit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001//api/deposit', {
        amount,
        fromAccount,
        toAccount
      });

      console.log('Deposit successful:', response.data);
    } catch (error: any) {
      console.error('Error making deposit:', error.response.data);
    }
  };

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleFromAccountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFromAccount(e.target.value);
  };

  const handleToAccountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setToAccount(e.target.value);
  };

  return (
    <form onSubmit={handleDeposit}>
      <h2>Deposit Money</h2>
      <input
        type="text"
        placeholder="Amount"
        value={amount}
        onChange={handleAmountChange}
      />
      <input
        type="text"
        placeholder="From Account"
        value={fromAccount}
        onChange={handleFromAccountChange}
      />
      <input
        type="text"
        placeholder="To Account"
        value={toAccount}
        onChange={handleToAccountChange}
      />
      <button type="submit">Deposit</button>
    </form>
  );
};

export default DepositForm;
