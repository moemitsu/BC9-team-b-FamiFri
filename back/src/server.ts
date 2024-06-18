import express, { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import { Transfer } from './types';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

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
        'Authorization': `Bearer ${process.env.SUNABAR_API_KEY}`
      }
    });
    */

    // 振替データを保存
    transfers.push({ amount, name, purpose, date: new Date() });

    res.status(200).json({ message: 'Transfer successful', transfers });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      res.status(error.response?.status || 500).json({ error: error.response?.data });
    } else {
      res.status(500).json({ error: 'Transfer failed' });
    }
  }
});

app.get('/api/balance', async (req: Request, res: Response) => {
  const { account } = req.query;

  try {
    const response = await axios.get(`${process.env.SUNABAR_API_URL}/accounts/balance`, {
      headers: {
        'Authorization': `Bearer ${process.env.SUNABAR_API_KEY}`
      }
    });

    res.status(200).json(response.data);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      res.status(error.response?.status || 500).json({ error: error.response?.data });
    } else {
      res.status(500).json({ error: 'Balance check failed' });
    }
  }
});

app.get('/api/transfers', (req: Request, res: Response) => {
  res.status(200).json(transfers);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
