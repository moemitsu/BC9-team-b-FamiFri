import express, { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import { Transfer } from './types';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
// CORS設定を特定のオリジンに限定
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

let transfers: Transfer[] = [];


app.post('/api/transfer', async (req: Request, res: Response) => {
  const { accountId, transferDesignatedDate, transferDateHolidayCode, totalCount, totalAmount, transfers } = req.body;

  if (!accountId || !transferDesignatedDate || !transferDateHolidayCode || !totalCount || !totalAmount || !transfers || !transfers.length) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  const transfer = transfers[0];

  if (!transfer.itemId || !transfer.transferAmount || !transfer.beneficiaryBankCode || !transfer.beneficiaryBranchCode || !transfer.accountTypeCode || !transfer.accountNumber || !transfer.beneficiaryName) {
    return res.status(400).json({ error: 'Missing required parameters in transfer object' });
  }

  try {
    const response = await axios.post(`${process.env.SUNABAR_API_URL}/transfer/request`, req.body, {
      headers: {
        'Accept': 'application/json;charset=UTF-8',
        'Content-Type': 'application/json;charset=UTF-8',
        'x-access-token': `${process.env.SUNABAR_API_KEY}`
      }
    });

    // 振替データを保存
    // transfers.push({
    //   itemId,
    //   transferAmount: transferAmount.toString(),
    //   beneficiaryBankCode,
    //   beneficiaryBranchCode,
    //   accountTypeCode,
    //   accountNumber,
    //   beneficiaryName
    // });

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
app.get('/api/transfers', async(req: Request, res: Response) => {
  try {
    const response = await axios.get(`${process.env.SUNABAR_API_URL}/accounts/transactions`, {
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

app.listen(port, () => {
  console.log(`サーバーはポート${port}で動作しています`);
});

