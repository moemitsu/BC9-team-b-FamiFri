// src/components/TransferList.tsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Transfer, TransferResponse } from './types';
import { Box, Heading, UnorderedList, ListItem } from '@chakra-ui/react';

const TransferList: React.FC = () => {
  const [transactions, setTransactions] = useState<Transfer[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const accountId = "302010008730"; // ここに適切なaccountIdを設定する
        const dateFrom = new Date(); // ここでは例として現在の日付を使用
        dateFrom.setMonth(dateFrom.getMonth() - 1); // 1ヶ月前の日付を設定
        const dateTo = new Date(); // 現在の日付

        const response = await axios.get<TransferResponse>('http://localhost:3001/api/status', {
          params: {
            accountId,
            dateFrom: dateFrom.toISOString().split('T')[0], // 'YYYY-MM-DD'形式に変換
            dateTo: dateTo.toISOString().split('T')[0], // 'YYYY-MM-DD'形式に変換
            nextItemKey:0
          },
        });
        console.log('Fetched transactions:', response.data.transactions); // データのログ出力
        setTransactions(response.data.transactions);
      } catch (error) {
        console.error('Error fetching transfers:', error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <Box bg="teal.600" color="white" p={4} rounded="md" mb={6}>
      <Heading size="md" mb={4}>入出金状況</Heading>
      <UnorderedList>
        {transactions.map((transaction, index) => (
          <ListItem key={index}>
            <strong>{transaction.remarks}</strong>
             - {transaction.transactionType === '1' ? '入金' : '出金'}: 
             {transaction.amount}円 on {new Date(transaction.transactionDate).toLocaleString()}
          </ListItem>
        ))}
      </UnorderedList>
    </Box>
  );
};

export default TransferList;
