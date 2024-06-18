import { useState } from 'react';
import axios from 'axios';

const BalanceCheck = () => {
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState(null);

  const handleCheckBalance = async (e) => {
    e.preventDefault();
    setError(null);
    setBalance(null);

    try {
      const response = await axios.get('/api/balance', {
        params: { account }
      });

      setBalance(response.data.balance);
    } catch (error) {
      setError(error.response.data);
    }
  };

  return (
    <div>
      <h2>Check Balance</h2>
      <form onSubmit={handleCheckBalance}>
        <input
          type="text"
          placeholder="Account"
          value={account}
          onChange={(e) => setAccount(e.target.value)}
        />
        <button type="submit">Check Balance</button>
      </form>
      {balance !== null && <p>Balance: {balance}</p>}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
};

export default BalanceCheck;
