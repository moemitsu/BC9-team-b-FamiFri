import { useEffect, useState } from 'react';
import axios from 'axios';

const TransferList = () => {
  const [transfers, setTransfers] = useState([]);

  useEffect(() => {
    const fetchTransfers = async () => {
      try {
        const response = await axios.get('/api/transfers');
        setTransfers(response.data);
      } catch (error) {
        console.error('Error fetching transfers:', error);
      }
    };

    fetchTransfers();
  }, []);

  return (
    <div>
      <h2>Transfer List</h2>
      <ul>
        {transfers.map((transfer, index) => (
          <li key={index}>
            <strong>{transfer.name}</strong> - {transfer.purpose}: {transfer.amount} on {new Date(transfer.date).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransferList;
