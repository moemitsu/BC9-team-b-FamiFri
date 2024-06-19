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

interface SunabarTransferRequest {
  accountId: string;
  transferDesignatedDate: string;
  transferDateHolidayCode: string;
  totalCount: string;
  totalAmount: string;
  transfers: {
    itemId: string;
    transferAmount: string;
    beneficiaryBankCode: string;
    beneficiaryBranchCode: string;
    accountTypeCode: string;
    accountNumber: string;
    beneficiaryName: string;
  }[];
}

// 振込依頼
app.post('/api/transfer', async (req: Request<any, any, SunabarTransferRequest>, res: Response) => {
  // const { amount, name, purpose } = req.body;

  try {
    const requestBody: SunabarTransferRequest = {
      accountId: "302010008730",
      transferDesignatedDate: "2024-06-19",
      transferDateHolidayCode: "1",
      totalCount: "1",
      totalAmount: "30000",
      transfers: [
        {
          itemId: "1",
          transferAmount: "30000",
          beneficiaryBankCode: "0310",
          beneficiaryBranchCode: "101",
          accountTypeCode: "1",
          accountNumber: "0009645",
          beneficiaryName: "ｽﾅﾊﾞ ｱﾔｶ(ｶ"
        }
      ]
    };

    const response = await axios.post(`${process.env.SUNABAR_API_URL}/transfer/request`, requestBody, {
      headers: {
        'Accept': 'application/json;charset=UTF-8',
        'Content-Type': 'application/json;charset=UTF-8',
        'x-access-token': `${process.env.SUNABAR_API_KEY}`
      }
    });

    // 振替データを保存
    // transfers.push({ amount, name, purpose, date: new Date() });

    res.status(200).json({ message: '振替が成功しました', transfers });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('APIリクエストエラー:', error.response?.data);
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
      }
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
