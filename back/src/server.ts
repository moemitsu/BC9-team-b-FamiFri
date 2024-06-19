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
  const { amount, name, purpose } = req.body;

  try {
    // Sunabar APIでの振替処理（コメントアウトしておきます）
    /*
    const response = await axios.post(`${process.env.SUNABAR_API_URL}/transfers`, {
      amount,
      fromAccount,
      toAccount
    }, {
      headers: {
        'x-access-token': `${process.env.SUNABAR_API_KEY}`
      }
    });
    */

    // 振替データを保存
    transfers.push({ amount, name, purpose, date: new Date() });

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

app.get('/api/transfers', (req: Request, res: Response) => {
  res.status(200).json(transfers);
});

app.listen(port, () => {
  console.log(`サーバーはポート${port}で動作しています`);
});
