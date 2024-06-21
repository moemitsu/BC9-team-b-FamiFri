import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BalanceResponse } from './types';  // 型をインポート
import { Box, Heading, Text, Collapse } from '@chakra-ui/react';

interface AxiosError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

interface BalanceCheckProps {
  onBalanceFetched: (balance: BalanceResponse) => void; // 残高情報を親コンポーネントに渡すコールバック
}

const BalanceCheck: React.FC<BalanceCheckProps> = ({ onBalanceFetched }) => {
  const [balance, setBalance] = useState<BalanceResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleToggle = async () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setError(null);
      setBalance(null);
      try {
        const response = await axios.get<BalanceResponse>('http://localhost:3001/api/balance');
        setBalance(response.data);
        onBalanceFetched(response.data); // 残高情報を親コンポーネントに渡す
      } catch (error: any) {
        const err = error as AxiosError;
        const errorMessage = err.response?.data?.message || 'An error occurred';
        setError(errorMessage);
      }
    }
  };

  return (
    <Box bg="teal.600" color="white" p={4} rounded="md" mb={6}>
      <Heading size="md" mb={4} cursor="pointer" onClick={handleToggle}>
        残高照会はこちら
      </Heading>
      <Collapse in={isOpen} animateOpacity>
        {balance !== null && (
          <Box>
            <Text fontSize="2xl" fontWeight="bold" mb={2}>
              現在の残高は、{balance.balances.reduce((total, b) => total + parseFloat(b.balance), 0).toLocaleString()}円です。
            </Text>
          </Box>
        )}
        {error && <Text color="red.500">Error: {error}</Text>}
      </Collapse>
    </Box>
  );
};

export default BalanceCheck;
