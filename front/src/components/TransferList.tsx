import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Transfer } from '../types';
import { Box, Heading, UnorderedList, ListItem } from '@chakra-ui/react';

const TransferList: React.FC = () => {
  const [transfers, setTransfers] = useState<Transfer[]>([]);

  useEffect(() => {
    const fetchTransfers = async () => {
      try {
        const response = await axios.get<Transfer[]>('http://localhost:3001//api/transfers');
        setTransfers(response.data);
      } catch (error) {
        console.error('Error fetching transfers:', error);
      }
    };

    fetchTransfers();
  }, []);

  return (
    <Box bg="teal.600" color="white" p={4} rounded="md" mb={6}>
    <Heading size="md" mb={4}>Transfer List</Heading>
    <UnorderedList>
      {transfers.map((transfer, index) => (
        <ListItem key={index}>
          <strong>{transfer.name}</strong> - {transfer.purpose}: {transfer.amount} on {new Date(transfer.date).toLocaleString()}
        </ListItem>
      ))}
    </UnorderedList>
  </Box>
  );
};

export default TransferList;
