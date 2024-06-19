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


// export interface Transfer {
//   amount: number;
//   name: string;
//   purpose: string;
//   fromAccount: string;
//   toAccount: string;
//   date: Date;
// }

export interface Transfer {
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

