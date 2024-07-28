import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Heading, UnorderedList, ListItem, Button } from '@chakra-ui/react';

interface Transaction {
  transferDesignatedDate: string;
  transferAmount: string;
  beneficiaryName: string;
}

const TransferList: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [showTransactions, setShowTransactions] = useState<boolean>(true);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get<{ transactions: Transaction[] }>('http://localhost:3001/api/status');
      console.log('Fetched transactions:', response.data.transactions); // データのログ出力
      const sortedTransactions = response.data.transactions.sort((a, b) =>
        new Date(b.transferDesignatedDate).getTime() - new Date(a.transferDesignatedDate).getTime()
      );
      setTransactions(sortedTransactions);
    } catch (error) {
      console.error('Error fetching transfers:', error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const toggleTransactions = () => {
    setShowTransactions(prevShowTransactions => !prevShowTransactions);
  };

  return (
    <Box bg="teal.600" color="white" p={4} rounded="md" mb={6} height="150px" overflowY="auto">
      <Heading size="md" mb={4}>入出金状況</Heading>
      <Button colorScheme="teal" mb={4} onClick={fetchTransactions}>更新</Button>
      <Button colorScheme="teal" mb={4} onClick={toggleTransactions}>
        {showTransactions ? '非表示' : '表示'}
      </Button>
      {showTransactions && (
        <UnorderedList style={{ display: 'flex', flexDirection: 'column-reverse' }}>
          {transactions.map((transaction, index) => (
            <ListItem key={index} mb={2}>
              <strong>{transaction.beneficiaryName}</strong> さんの口座に {transaction.transferAmount}円を入金しました: {transaction.transferDesignatedDate}
            </ListItem>
          ))}
        </UnorderedList>
      )}
    </Box>
  );
};

export default TransferList;
