import React, { useState } from 'react';
import TransferForm from '../components/TransferForm';
import BalanceCheck from '../components/BalanceCheck';
import TransferList from '../components/TransferList';
import { Transfer } from '../types';
import { ChakraProvider, Box, Heading, Text, Button, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';

export default function Home() {
  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const [notification, setNotification] = useState<string>('');

  const handleTransfer = (newTransfers: Transfer[], transferDate: string) => {
    setTransfers(newTransfers);
    setNotification(`出金されました。振込依頼の確認をお願いします。日時: ${transferDate}`);
  };

  return (
    <ChakraProvider>
      <Box minH="100vh" bg="white" p={8}>
        <Box bg="teal.600" p={4} rounded="md" mb={6} display="flex" alignItems="center" justifyContent="space-between">
          <div>
          <Heading color="white" size="xl">famifri</Heading>
            <Text fontSize="sm" color="white"> ーファミフリー  予算を決めて、精算ができるアプリ</Text>
          </div>
          <Menu>
            <MenuButton as={Button} colorScheme="teal">
              メニュー
            </MenuButton>
            <MenuList>
              <MenuItem>設定</MenuItem>
            </MenuList>
          </Menu>
        </Box>
        {notification && (
          <Box bg="teal.600" color="white" p={4} rounded="md" mb={6}>
            <Text>{notification}</Text>
          </Box>
        )}
        <BalanceCheck />
        <TransferForm onTransfer={handleTransfer} />
        <TransferList />
      </Box>
    </ChakraProvider>
  );
}
