import { useState } from 'react';
import TransferForm from '../components/TransferForm';
import BalanceCheck from '../components/BalanceCheck';
import TransferList from '../components/TransferList';

export default function Home() {
  const [transfers, setTransfers] = useState([]);

  const handleTransfer = (newTransfers) => {
    setTransfers(newTransfers);
  };

  return (
    <div>
      <h1>Banking App</h1>
      <TransferForm onTransfer={handleTransfer} />
      <BalanceCheck />
      <TransferList />
    </div>
  );
}
