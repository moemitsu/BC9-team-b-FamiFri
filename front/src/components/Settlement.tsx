import React, { useState } from 'react';
import { Box, Heading, Text, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';
import { BalanceResponse } from './types';

interface Balance {
  accountTypeName: string;
  balance: string;
  currencyName: string;
}

interface SettlementProps {
  totalBalance: BalanceResponse | null; // 残高情報を受け取る
}

const Settlement: React.FC<SettlementProps> = ({ totalBalance }) => {
  const [numberOfPeople, setNumberOfPeople] = useState<number>(1); // 人数
  const [productionAmount, setProductionAmount] = useState<number>(0); // 1人当たりの精算額
  const [formVisible, setFormVisible] = useState<boolean>(false); // フォームの表示・非表示を管理するstate

  const toggleFormVisibility = () => {
    setFormVisible(!formVisible);
  };

  const calculateProductionAmount = () => {
    if (!totalBalance || numberOfPeople <= 0) {
      setProductionAmount(0);
    } else {
      const total = totalBalance.balances.reduce((total, b) => total + parseFloat(b.balance), 0);
      if (numberOfPeople === 1) {
        setProductionAmount(total);
      } else {
        setProductionAmount(total / numberOfPeople);
      }
    }
  };

  return (
    <Box bg="teal.600" color="white" p={4} rounded="md" mb={6}>
      <Heading size="md" mb={4} cursor="pointer" onClick={toggleFormVisibility}>
        精算額の計算はこちら
      </Heading>
      {formVisible && (
        <Box>
          <FormControl mb={4}>
            <FormLabel>参加人数を入力してください</FormLabel>
            <Input
              type="number"
              min={1}
              value={numberOfPeople}
              onChange={(e) => setNumberOfPeople(parseInt(e.target.value))}
            />
          </FormControl>
          <Button colorScheme="teal" onClick={calculateProductionAmount}>
            計算する
          </Button>
          <Box mt={4}>
            <Text fontSize="lg">1人当たりの精算金額: {productionAmount.toLocaleString()} 円</Text>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Settlement;
