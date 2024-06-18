import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { Transfer } from '../types';

interface TransferFormProps {
  onTransfer: (transfers: Transfer[]) => void;
}

const TransferForm: React.FC<TransferFormProps> = ({ onTransfer }) => {
  const [amount, setAmount] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [purpose, setPurpose] = useState<string>('');

  const handleTransfer = async (e: FormEvent) => {
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
    } catch (error: any) {
      console.error('Error making transfer:', error.response.data);
    }
  };

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handlePurposeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPurpose(e.target.value);
  };

  return (
    <form onSubmit={handleTransfer}>
      <h2>Transfer Money</h2>
      <input
        type="text"
        placeholder="Amount"
        value={amount}
        onChange={handleAmountChange}
      />
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={handleNameChange}
      />
      <input
        type="text"
        placeholder="Purpose"
        value={purpose}
        onChange={handlePurposeChange}
      />
      <button type="submit">Transfer</button>
    </form>
  );
};

export default TransferForm;
