import express, { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import { Transfer,TransferStatusResponse } from './types';
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


// 振込ステータス一覧取得
app.get('/api/status', async (req: Request, res: Response) => {
  // const queryKeyClass = '2'; // 照会対象キー区分の値
  // const accountId = "302010008723"; // 指定された口座番号

  try {
    const response = await axios.get<TransferStatusResponse>(`${process.env.SUNABAR_API_URL}/transfer/status`, {
      params: {
        queryKeyClass: '2',
        accountId: "302010008723",
      },
      headers: {
        'Accept': 'application/json;charset=UTF-8',
        'Content-Type': 'application/json;charset=UTF-8',
        'x-access-token': `${process.env.SUNABAR_API_KEY}`

      }
    });

    res.status(200).json(response.data.transfers);

  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('APIリクエストエラー:', error.response?.data);
      res.status(error.response?.status || 500).json({ error: error.response?.data });
    } else {
      console.error('予期しないエラー:', error);

      res.status(500).json({ error: '予期しないエラーにより振込一覧の取得に失敗しました' });

    }
  }
});

app.listen(port, () => {
  console.log(`サーバーはポート${port}で動作しています`);
});