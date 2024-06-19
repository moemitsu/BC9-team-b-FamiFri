import express, { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import { Transfer } from './types';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

let transfers: Transfer[] = [];


app.post('/api/transfer', async (req: Request, res: Response) => {
  const { itemId, transferAmount, beneficiaryBankCode, beneficiaryBranchCode, accountTypeCode, accountNumber, beneficiaryName } = req.body;

  if (!itemId || !transferAmount || !beneficiaryBankCode || !beneficiaryBranchCode || !accountTypeCode || !accountNumber || !beneficiaryName) {
    const missingParams = [];
    if (!itemId) missingParams.push('itemId');
    if (!transferAmount) missingParams.push('transferAmount');
    if (!beneficiaryBankCode) missingParams.push('beneficiaryBankCode');
    if (!beneficiaryBranchCode) missingParams.push('beneficiaryBranchCode');
    if (!accountTypeCode) missingParams.push('accountTypeCode');
    if (!accountNumber) missingParams.push('accountNumber');
    if (!beneficiaryName) missingParams.push('beneficiaryName');
    

    return res.status(400).json({ error: 'Missing required parameters', missingParams });
  }

  try {
    // Sunabar APIでの振替処理
    const transferRequest = {
      accountId: "302010008723",
      transferDesignatedDate: new Date().toISOString().split('T')[0], // 当日の日付
      transferDateHolidayCode: "1",
      totalCount: "1",
      totalAmount: transferAmount.toString(),
      transfers: [
        {
          itemId: "1",
          transferAmount: transferAmount.toString(),
          beneficiaryBankCode,
          beneficiaryBranchCode,
          accountTypeCode,
          accountNumber,
          beneficiaryName
        }
      ]
    };

    const response = await axios.post(`${process.env.SUNABAR_API_URL}/transfer/request`, transferRequest, {

      headers: {
        'Accept': 'application/json;charset=UTF-8',
        'Content-Type': 'application/json;charset=UTF-8',
        'x-access-token': `${process.env.SUNABAR_API_KEY}`
      }
    });

    // 振替データを保存

    // transfers.push({ amount, name: beneficiaryName, purpose: "Transfer", fromAccount, toAccount, date: new Date() });


    res.status(200).json({ message: '振替が成功しました', transfers });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('APIリクエストエラー:', error.response?.data);
      console.error('詳細エラー:', error.toJSON());
      res.status(error.response?.status || 500).json({ error: error.response?.data });
    } else {
      console.error('予期しないエラー:', error);
      res.status(500).json({ error: '予期しないエラーにより振替に失敗しました' });
    }
  }
});

// 残高照会
app.get('/api/balance', async (req: Request, res: Response) => {
  try {
    const response = await axios.get(`${process.env.SUNABAR_API_URL}/accounts/balances`, {
      headers: {
        'Accept': 'application/json;charset=UTF-8',
        'Content-Type': 'application/json;charset=UTF-8',
        'x-access-token': `${process.env.SUNABAR_API_KEY}`

      },

    });

    res.status(200).json(response.data);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('APIリクエストエラー:', error.response?.data);
      res.status(error.response?.status || 500).json({ error: error.response?.data });
    } else {
      console.error('予期しないエラー:', error);
      res.status(500).json({ error: '予期しないエラーにより残高確認に失敗しました' });
    }
  }
});

// 振込履歴照会
app.get('/api/transfers', (req: Request, res: Response) => {
  res.status(200).json(transfers);
});

app.listen(port, () => {
  console.log(`サーバーはポート${port}で動作しています`);
});

