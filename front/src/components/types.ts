export interface Balance {
  accountId: string;
  accountTypeCode: string;
  accountTypeName: string;
  balance: string;
  baseDate: string;
  baseTime: string;
  withdrawableAmount: string;
  previousDayBalance: string;
  previousMonthBalance: string;
  currencyCode: string;
  currencyName: string;
}

export interface SpAccountBalance {
  accountId: string;
  odBalance: string;
  tdTotalBalance: string;
  fodTotalBalanceYenEquivalent: string;
  spAccountFcyBalances: any[]; // 詳細な型が不明な場合はany[]とします
}

export interface BalanceResponse {
  balances: Balance[];
  spAccountBalances: SpAccountBalance[];
}
