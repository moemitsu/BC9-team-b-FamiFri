const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

// 振替データを保存するためのメモリ内データベース
let transfers = [];

// 振替エンドポイント
app.post('/api/transfer', async (req, res) => {
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
  } catch (error) {
    res.status(500).json({ error: 'Transfer failed' });
  }
});

// 残高確認エンドポイント
app.get('/api/balance', async (req, res) => {
  const { account } = req.query;

  try {
    const response = await axios.get(`${process.env.SUNABAR_API_URL}/accounts/${account}/balance`, {
      headers: {
        'Authorization': `Bearer ${process.env.SUNABAR_API_KEY}`
      }
    });

    res.status(200).json(response.data);
  } catch (error) {
    res.status(error.response.status).json({ error: error.response.data });
  }
});

// 振替リスト取得エンドポイント
app.get('/api/transfers', (req, res) => {
  res.status(200).json(transfers);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
