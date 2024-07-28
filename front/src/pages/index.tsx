// src/pages/index.tsx

import React, { useState, useEffect } from 'react';
import TransferForm from '../components/TransferForm';
import BalanceCheck from '../components/BalanceCheck';
import Settlement from '../components/Settlement';
import TransferList from '../components/TransferList';
import { BalanceResponse } from '../components/types';
import DepositRequest from '../components/DepositRequest';
import { Transfer } from '../types';
import { Link, Element } from 'react-scroll';
import { ChakraProvider, Box, Heading, Text, Button, Flex, Menu, MenuButton, MenuList, MenuItem, VStack } from '@chakra-ui/react';
import EventTitle from '../components/EventTitle'; // 新しく追加したEventTitleコンポーネントをインポート

interface Notification {
  message: string;
  date: Date;
}

export default function Home() {
  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [totalBalance, setTotalBalance] = useState<BalanceResponse | null>(null); // 残高情報の状態管理
  
  const handleTransfer = (newTransfers: Transfer[], transferDate: string) => {
    setTransfers(newTransfers);
    const newNotification: Notification = {
      message: `お知らせ：日時: ${transferDate}に支出されました。管理者の方は、振込依頼の確認をお願いします。`,
      date: new Date()
    };
    setNotifications(prevNotifications => {
      const updatedNotifications = [newNotification, ...prevNotifications].filter(notification => {
        const now = new Date();
        const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        return notification.date >= oneDayAgo;
      });
      return updatedNotifications;
    });
  };
  
  const handleBalanceFetched = (balance: BalanceResponse) => {
    setTotalBalance(balance); // 残高情報をセット
  };

  return (
    <ChakraProvider>
      <Box minH="100vh" bg="white" p={8}>
        <Flex align="center" justify="space-between" bg="teal.600" p={4} rounded="md" mb={6}>
          <Flex align="center">
            <Heading color="white" size="xl">famifri</Heading>
            <Text fontSize="lg" color="white" ml={4}> ーファミフリー 予算を決めて、精算ができるアプリ</Text>
          </Flex>
          <Menu>
            <MenuButton as={Button} colorScheme="teal">
              メニュー
            </MenuButton>
            <MenuList>
              <Link to="balance-check" smooth={true} duration={500}>
                <MenuItem>残高を見る</MenuItem>
              </Link>
              <Link to="transfer-form" smooth={true} duration={500}>
                <MenuItem>使ったお金を申請する</MenuItem>
              </Link>
              <Link to="transfer-list" smooth={true} duration={500}>
                <MenuItem>使ったお金の一覧を見る</MenuItem>
              </Link>
              <Link to="settlement" smooth={true} duration={500}>
                <MenuItem>余ったお金を清算する</MenuItem>
              </Link>
            </MenuList>
          </Menu>
        </Flex>
        {notifications.length > 0 && (
          <VStack align="start" bg="teal.600" color="white" p={4} rounded="md" mb={6}>
            {notifications.map((notification, index) => (
              <Text key={index} borderBottom="1px solid white" pb={1} mb={1}>
                {notification.message}
              </Text>
            ))}
          </VStack>
        )}
        <EventTitle 
          eventName="サマーフェスティバル"
          eventDateTime="2024年7月20日 午後3時"
          participantsCount={25}
          adultsCount={15} // 大人の参加者数
          childrenCount={10} // 子供の参加者数
          participants={['田中太郎', '山田花子', '佐藤次郎', '鈴木一郎']}
        />
        
        <DepositRequest 
          bankName={'GMOあおぞらネット銀行'} 
          branchNumber={'310'} 
          branchName={'にじ支店'} 
          accountHolder={'スナバ トシロウ'} 
          accountNumber={'1234567'} 
          depositAmount={10000} 
          deadline={'2024年6月30日'} 
        />
        <BalanceCheck onBalanceFetched={handleBalanceFetched} /> {/* 残高取得関数を渡す */}
        <TransferForm onTransfer={handleTransfer} />
        <TransferList />
        <Settlement totalBalance={totalBalance} />{/* 残高情報を渡す */}
      </Box>
    </ChakraProvider>
  );
}

