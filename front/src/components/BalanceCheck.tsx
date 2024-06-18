import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

interface BalanceResponse {
  balance: number;
}

interface AxiosError {
  response: {
    data: {
      message: string;
    };
  };
}

const BalanceCheck: React.FC = () => {
  const [account, setAccount] = useState<string>('');
  const [balance, setBalance] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCheckBalance = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setBalance(null);

    try {
      const response = await axios.get<BalanceResponse>('/api/balance', {
        params: { account }
      });

      setBalance(response.data.balance);
    } catch (error: any) {
      const err = error as AxiosError;
      setError(err.response.data.message || 'An error occurred');
    }
  };

  const handleAccountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAccount(e.target.value);
  };

  return (
    <div>
      <h2>Check Balance</h2>
      <form onSubmit={handleCheckBalance}>
        <input
          type="text"
          placeholder="Account"
          value={account}
          onChange={handleAccountChange}
        />
        <button type="submit">Check Balance</button>
      </form>
      {balance !== null && <p>Balance: {balance}</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default BalanceCheck;
