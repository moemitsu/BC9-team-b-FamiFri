import { useState } from 'react';
import axios from 'axios';

const TransferForm = ({ onTransfer }) => {
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');
  const [purpose, setPurpose] = useState('');

  const handleTransfer = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/transfer', {
        amount,
        name,
        purpose
      });

      onTransfer(response.data.transfers);
      setAmount('');
      setName('');
      setPurpose('');
    } catch (error) {
      console.error('Error making transfer:', error.response.data);
    }
  };

  return (
    <form onSubmit={handleTransfer}>
      <h2>Transfer Money</h2>
      <input
        type="text"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Purpose"
        value={purpose}
        onChange={(e) => setPurpose(e.target.value)}
      />
      <button type="submit">Transfer</button>
    </form>
  );
};

export default TransferForm;
