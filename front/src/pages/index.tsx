import React, { useState } from 'react';
import TransferForm from '../components/TransferForm';
import BalanceCheck from '../components/BalanceCheck';
import TransferList from '../components/TransferList';
import { Transfer } from '../types';
import { ChakraProvider, Box, Heading, Text } from '@chakra-ui/react';

export default function Home() {
  const [transfers, setTransfers] = useState<Transfer[]>([]);

  const handleTransfer = (newTransfers: Transfer[]) => {
    setTransfers(newTransfers);
  };

  return (

    <ChakraProvider>
      <Box minH="100vh" bg="teal.600" p={8}>
        <Heading color="white" mb={6}>famifri</Heading>
        <Box bg="teal.700" color="white" p={4} rounded="md" mb={6}>
          <Text>お知らせ: 出金されました。振込依頼の確認をお願いします。</Text>
        </Box>
        <BalanceCheck />
        <TransferForm onTransfer={handleTransfer} />
        <TransferList />
      </Box>
    </ChakraProvider>
  );
}
