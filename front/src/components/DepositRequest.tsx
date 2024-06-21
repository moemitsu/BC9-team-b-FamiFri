import React from 'react';
import { Box, Heading, Text, FormControl, FormLabel, Flex } from '@chakra-ui/react';

interface DepositRequestProps {
  bankName: string;
  branchNumber: string;
  branchName: string;
  accountHolder: string;
  accountNumber: string;
  depositAmount: number;
  deadline: string;
}

const DepositRequest: React.FC<DepositRequestProps> = ({ 
  bankName, 
  branchNumber, 
  branchName, 
  accountHolder, 
  accountNumber, 
  depositAmount, 
  deadline 
}) => {
  return (
    <Box bg="teal.600" color="white" p={4} rounded="md" mb={6}>
      <Heading size="md" mb={4}>入金のお願い（入金期限：{deadline}）</Heading>
      <Flex mb={4}>
        <FormControl mr={4}>
          <FormLabel>銀行名</FormLabel>
          <Text fontSize="lg" fontWeight="bold">{bankName}</Text>
        </FormControl>
        <FormControl mr={4}>
          <FormLabel>支店番号</FormLabel>
          <Text fontSize="lg" fontWeight="bold">{branchNumber}</Text>
        </FormControl>
        <FormControl>
          <FormLabel>支店名</FormLabel>
          <Text fontSize="lg" fontWeight="bold">{branchName}</Text>
        </FormControl>
        <FormControl></FormControl>
      </Flex>
      <Flex mb={4}>
        <FormControl mr={4}>
          <FormLabel>口座番号</FormLabel>
          <Text fontSize="lg" fontWeight="bold">{accountNumber}</Text>
        </FormControl>
        <FormControl>
          <FormLabel>口座名義</FormLabel>
          <Text fontSize="lg" fontWeight="bold">{accountHolder}</Text>
        </FormControl>
        <FormControl mr={4}>
          <FormLabel>入金金額</FormLabel>
          <Text fontSize="lg" fontWeight="bold">{depositAmount.toLocaleString()} 円</Text>
        </FormControl>
        <FormControl>
          <FormLabel>期限</FormLabel>
          <Text fontSize="lg" fontWeight="bold">{deadline}</Text>
        </FormControl>
      </Flex>
    </Box>
  );
};

export default DepositRequest;
