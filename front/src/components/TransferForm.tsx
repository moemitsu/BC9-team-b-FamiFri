import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { Transfer } from '../types';
import { Box, Button, Heading, Input, FormControl, FormLabel } from '@chakra-ui/react';
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
      const response = await axios.post('http://localhost:3001//api/transfer', {
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
    <Box as="form" onSubmit={handleTransfer} bg="teal.800" color="white" p={4} rounded="md" mb={6}>
    <Heading size="md" mb={4}>出金内容を入力してください。</Heading>
    <FormControl mb={4}>
      <FormLabel>入金額</FormLabel>
      <Input
        type="text"
        placeholder="入金額"
        value={amount}
        onChange={handleAmountChange}
        bg="white"
        color="black"
      />
    </FormControl>
    <FormControl mb={4}>
      <FormLabel>振込先口座</FormLabel>
      <Input
        type="text"
        placeholder="振込先口座"
        value={name}
        onChange={handleNameChange}
        bg="white"
        color="black"
      />
    </FormControl>
    <FormControl mb={4}>
      <FormLabel>用途</FormLabel>
      <Input
        type="text"
        placeholder="用途"
        value={purpose}
        onChange={handlePurposeChange}
        bg="white"
        color="black"
      />
    </FormControl>
    <Button type="submit" colorScheme="teal">
      出金します
    </Button>
  </Box>
  );
};

export default TransferForm;
