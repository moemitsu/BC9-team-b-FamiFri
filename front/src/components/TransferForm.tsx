import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { Box, Button, Heading, Input, FormControl, FormLabel } from '@chakra-ui/react';

interface TransferFormProps {
  onTransfer: (transfers: any) => void; // Adjust 'any' based on actual response structure
}

const TransferForm: React.FC<TransferFormProps> = ({ onTransfer }) => {
  const [amount, setAmount] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [purpose, setPurpose] = useState<string>('');

  const handleTransfer = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const requestBody = {
        accountId: "302010008730",
        transferDesignatedDate: "2024-06-19",
        transferDateHolidayCode: "1",
        totalCount: "1",
        totalAmount: amount,
        transfers: [
          {
            itemId: "1",
            transferAmount: amount,
            beneficiaryBankCode: "0310",
            beneficiaryBranchCode: "101",
            accountTypeCode: "1",
            accountNumber: "0009645",
            beneficiaryName: name
          }
        ]
      };

      const response = await axios.post('http://localhost:3001/api/transfer', requestBody);

      onTransfer(response.data); // Assuming response data contains the transfers or relevant information
      setAmount('');
      setName('');
      setPurpose('');
    } catch (error: any) {
      console.error('Error making transfer:', error.response?.data);
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
          placeholder="口座番号"
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
