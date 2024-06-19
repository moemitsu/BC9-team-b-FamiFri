import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import { BalanceResponse } from './types';  // 型をインポート
import { Box, Button, Heading, Text, UnorderedList, ListItem } from '@chakra-ui/react';
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
    <Box bg="teal.800" color="white" p={4} rounded="md" mb={6}>
    <Heading size="md" mb={4}>残高照会します</Heading>
    <form onSubmit={handleCheckBalance}>
      <Button type="submit" colorScheme="teal" mb={4}>
        残高照会します
      </Button>
    </form>
    {balance !== null && (
      <Box>
        <Text fontSize="lg" mb={2}>現在の残高は、{balance.balances.reduce((total, b) => total + parseFloat(b.balance), 0)}円です。</Text>
        <UnorderedList>
          {balance.balances.map((b, index) => (
            <ListItem key={index}>
              {b.accountTypeName}: {b.balance} {b.currencyName}
            </ListItem>
          ))}
        </UnorderedList>
      </Box>
    )}
    {error && <Text color="red.500">Error: {error}</Text>}
  </Box>
  );
};

export default BalanceCheck;
