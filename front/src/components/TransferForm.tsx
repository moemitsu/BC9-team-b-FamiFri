import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { Box, Button, Heading, Input, FormControl, FormLabel } from '@chakra-ui/react';

interface TransferFormProps {
  onTransfer: (transfers: any, transferDate: string) => void;
}

// 全角カタカナを半角カタカナに変換する関数
const toHalfWidthKatakana = (str: string) => {
  return str.replace(/[\u30a1-\u30f6]/g, ch =>
    String.fromCharCode(ch.charCodeAt(0) - 0x60)
  );
};

const TransferForm: React.FC<TransferFormProps> = ({ onTransfer }) => {
  const [amount, setAmount] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [purpose, setPurpose] = useState<string>('');
  const [beneficiaryBranchCode, setBeneficiaryBranchCode] = useState<string>('');
  const [accountNumber, setAccountNumber] = useState<string>('');

  const handleTransfer = async (e: FormEvent) => {
    e.preventDefault();

    const today = new Date().toISOString().split('T')[0]; // 今日の日付を YYYY-MM-DD 形式で取得

    try {
      const requestBody = {
        accountId: "302010008730",
        transferDesignatedDate: today,
        transferDateHolidayCode: "1",
        totalCount: "1",
        totalAmount: amount,
        transfers: [
          {
            itemId: "1",
            transferAmount: amount,
            beneficiaryBankCode: "0310",
            beneficiaryBranchCode,
            accountTypeCode: "1",
            accountNumber,
            beneficiaryName: name
          }
        ]
      };

      const response = await axios.post('http://localhost:3001/api/transfer', requestBody);

      const transferDate = new Date().toLocaleString(); // 出金日時を取得
      onTransfer(response.data, transferDate);
      setAmount('');
      setName('');
      setPurpose('');
      setBeneficiaryBranchCode('');
      setAccountNumber('');
    } catch (error: any) {
      console.error('Error making transfer:', error.response?.data);
      alert('振込できませんでした。入力内容を確認してください');
    }
  };

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const halfWidthKatakana = toHalfWidthKatakana(inputValue);
    setName(halfWidthKatakana);
  };

  const handlePurposeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPurpose(e.target.value);
  };

  const handleBeneficiaryBranchCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBeneficiaryBranchCode(e.target.value);
  };

  const handleAccountNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAccountNumber(e.target.value);
  };

  return (
    <Box as="form" onSubmit={handleTransfer} bg="teal.600" color="white" p={4} rounded="md" mb={6}>
      <Heading size="md" mb={4}>支出内容を入力してください。</Heading>
      <FormControl mb={4}>
        <FormLabel>支出額</FormLabel>
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
        <FormLabel>支店コード</FormLabel>
        <Input
          type="text"
          placeholder="支店コード"
          value={beneficiaryBranchCode}
          onChange={handleBeneficiaryBranchCodeChange}
          bg="white"
          color="black"
        />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>口座番号</FormLabel>
        <Input
          type="text"
          placeholder="口座番号"
          value={accountNumber}
          onChange={handleAccountNumberChange}
          bg="white"
          color="black"
        />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>振込先口座名</FormLabel>
        <Input
          type="text"
          placeholder="振込先口座名"
          value={name}
          onChange={handleNameChange}
          bg="white"
          color="black"
        />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>支出内容をご記入ください。</FormLabel>
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
        支出します
      </Button>
    </Box>
  );
};

export default TransferForm;
