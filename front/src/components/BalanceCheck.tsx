import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import { BalanceResponse } from './types';  // 型をインポート

interface AxiosError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

const BalanceCheck: React.FC = () => {
  const [balance, setBalance] = useState<BalanceResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCheckBalance = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setBalance(null);

    try {
      const response = await axios.get<BalanceResponse>('http://localhost:3001/api/balance');
      setBalance(response.data);
    } catch (error: any) {
      const err = error as AxiosError;
      const errorMessage = err.response?.data?.message || 'An error occurred';
      setError(errorMessage);
    }
  };

  return (
    <div>
      <h2>Check Balance</h2>
      <form onSubmit={handleCheckBalance}>
        <button type="submit">Check Balance</button>
      </form>
      {balance !== null && (
        <div>
          <h3>Balances</h3>
          <ul>
            {balance.balances.map((b, index) => (
              <li key={index}>
                {b.accountTypeName}: {b.balance} {b.currencyName}
              </li>
            ))}
          </ul>
          {/* <h3>SP Account Balances</h3>
          <ul>
            {balance.spAccountBalances.map((sp, index) => (
              <li key={index}>
                {sp.accountId}: {sp.odBalance}
              </li>
            ))}
          </ul> */}
        </div>
      )}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default BalanceCheck;
