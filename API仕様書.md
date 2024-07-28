# 支出共有管理アプリ"FamiFri"API仕様書

## 概要

このAPIは、共有支出管理アプリケーションの振込依頼、残高確認、振替依頼照会に関するエンドポイントを提供します。

### エンドポイント一覧
機能  |	エンドポイント|	メソッド|
-----|-------------|--------|
振込依頼|/api/transfer|	 POST |
残高確認|/api/balance |  GET  |
振替状況照会|/api/status| GET  |

1. 振込依頼
- エンドポイント: /api/transfer

- メソッド: POST

- リクエストヘッダー:
```
     {
        'API url': 'https:/api.sunabar.gmo-aozora.com/personal/v1/transfer/request',
        'Accept': 'application/json;charset=UTF-8',
        'x-access-token': sunabarToken
     }
```


- リクエストボディ:
```
　　　　{
        accountId: "string",
        transferDesignatedDate: currentDate,
        transferDateHolidayCode: "1",
        totalCount: "1",
        totalAmount: "string",
        transfers: [
          {
            itemId: "string",
            transferAmount: "string",
            beneficiaryBankCode: "string",
            beneficiaryBranchCode: "string",
            accountTypeCode: "1",
            accountNumber: "string",
            beneficiaryName: "string"
          }]}
```
- レスポンス:

- 成功時 (ステータス 201):
```
   {
      "accountId": "string",
      "resultCode": "1",
      "applyNo": "string",
      "applyEndDatetime": "Datetime"
    }
```
- エラー時 (ステータス 400, 401, 500):
```
   {
      "errorCode": "ERROR12345",
      "errorMessage": "エラーメッセージ"
   }
```
2. 残高確認
- エンドポイント: /api/balances

- メソッド: GET

- リクエストヘッダー:
  ```
    {
     'https:/api.gmo-aozora.com/ganb/api/simulator/personal/v1/accounts/balances?accountId=' \
     'accept: application/json;charset=UTF-8' \
     'x-access-token: your access token'

     "accountId": "string"	 [ 12 .. 29 ] //口座ID
     //口座を識別するIDまたは、つかいわけ口座を識別するID

     "x-access-token": "string" (required) //アクセストークン
     }
  ```


- レスポンス:

  - 成功時 (ステータス 200):
  ```

   {
  "balances": [
    {
      "accountId": "string",
      "accountTypeCode": "01",
      "accountTypeName": "string",
      "balance": "string",
      "baseDate": "date",
      "baseTime": "datetime",
      "withdrawableAmount": "string",
      "previousDayBalance": "string",
      "previousMonthBalance": "string",
      "currencyCode": "JPY",
      "currencyName": "日本円",
      "fcyTotalBalance": "350.48",
      "ttb": "110.5",
      "baseRateDate": "date",
      "baseRateTime": "datetime",
      "yenEquivalent": "38728"
    }
  ],
  "spAccountBalances": [
    {
      "accountId": "string",
      "odBalance": "string",
      "tdTotalBalance": "string",
      "fodTotalBalanceYenEquivalent": "string",
      "spAccountFcyBalances": [
        {
          "currencyCode": "JPY",
          "currencyName": "日本円",
          "fcyTotalBalance": "350.48",
          "ttb": "110.5",
          "baseRateDate": "date",
          "baseRateTime": "datetime",
          "yenEquivalent": "38728"
        }
      ]
    }
  ]
  }

- エラー時 (ステータス 401, 500):    

  ```
  {
  "errorCode": "ERROR12345",
  "errorMessage": "エラーメッセージ"
  }

  ```
3.振込状況照会  
- エンドポイント: /api/status
  
- メソッド: GET

- リクエストヘッダー:
  ```
    {
        'API url': 'https:/api.sunabar.gmo-aozora.com/personal/v1/transfer/request',
        'Accept': 'application/json;charset=UTF-8',
        'x-access-token': sunabarToken
     }

- リクエストボディ:
  ```  
   {
    "queryKeyClass": "string",
    "accountId": "string",
    "dateFrom": "string",  
    "dateTo": "string"'   
   }

- レスポンス（例）:
 ``` 
  {
  "acceptanceKeyClass": "string",
  "baseDate": "string",
  "baseTime": "string",
  "count": 1,
  "transferQueryBulkResponses": [
     {
      "dateFrom": "2018-07-30",
      "dateTo": "2018-08-10",
      "requestNextItemKey": "1234567890",
      "requestTransferStatuses": [
        {
          "requestTransferStatus": "20"
        }
      ],
      "requestTransferTerm": "1",
      "hasNext": true,
      "nextItemKey": "1234567890"
    }
  ],
  "transferDetails": [
    {
      "transferStatus": "20",
      "transferStatusName": "手続済",
      "transferTypeName": "振込振替",
      "isFeeFreeUse": true,
      "isFeePointUse": true,
      "pointName": "GMOポイント",
      "transferDetailFee": "345",
      "totalDebitAmount": "123456",
      "transferApplies": [
        {
          "applyNo": "2018072902345678",
          "transferApplyDetails": [
            {
              "applyDatetime": "2018-07-29T10:00:00+09:00",
              "applyStatus": "1"
            }
          ]
        }
      ],
      "transferAccepts": [
        {
          "acceptNo": "2018072901234567",
          "acceptDatetime": "2018-07-29T10:00:00+09:00"
        }
      ],
      "transferResponses": [
        {
          "accountId": "301011234567",
          "remitterName": "ｱｵｿﾞﾗ ﾃｽﾄ",
          "transferDesignatedDate": "2018-07-30",
          "transferInfos": [
            {
              "transferAmount": "1000",
              "ediInfo": "ｾｲｷﾖｳｼﾖﾊﾞﾝｺﾞｳ1234",
              "beneficiaryBankCode": "0398",
              "beneficiaryBankName": "ｱｵｿﾞﾗ",
              "beneficiaryBranchCode": "111",
              "beneficiaryBranchName": "ﾎﾝﾃﾝ",
              "accountTypeCode": "1",
              "accountNumber": "1234567",
              "beneficiaryName": "ｶ)ｱｵｿﾞﾗｻﾝｷﾞﾖｳ",
              "transferDetailResponses": [
                {
                  "beneficiaryBankNameKanji": "あおぞら銀行",
                  "beneficiaryBranchNameKanji": "本店",
                  "usedPoint": "1000",
                  "isFeeFreeUsed": false,
                  "transferFee": "1000"
                 }
              ],
              "unableDetailInfos": [
                {
                  "transferDetailStatus": "1"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}

