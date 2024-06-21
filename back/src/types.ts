// export interface Balance {
//   accountId: string;
//   accountTypeCode: string;
//   accountTypeName: string;
//   balance: string;
//   baseDate: string;
//   baseTime: string;
//   withdrawableAmount: string;
//   previousDayBalance: string;
//   previousMonthBalance: string;
//   currencyCode: string;
//   currencyName: string;
// }

// export interface SpAccountBalance {
//   accountId: string;
//   odBalance: string;
//   tdTotalBalance: string;
//   fodTotalBalanceYenEquivalent: string;
//   spAccountFcyBalances: any[]; // 詳細な型が不明な場合はany[]とします
// }

// export interface BalanceResponse {
//   balances: Balance[];
//   spAccountBalances: SpAccountBalance[];
// }


// export interface Transfer {
//   accountId: string;
//   transferDesignatedDate: string;
//   transferDateHolidayCode: string;
//   totalCount: string;
//   totalAmount: string;
//   transfers: {
//     itemId: string;
//     transferAmount: string;
//     beneficiaryBankCode: string;
//     beneficiaryBranchCode: string;
//     accountTypeCode: string;
//     accountNumber: string;
//     beneficiaryName: string;
//   }[];

// }

export interface TransferItem {
  itemId: string;
  transferAmount: string;
  beneficiaryBankCode: string;
  beneficiaryBranchCode: string;
  accountTypeCode: string;
  accountNumber: string;
  beneficiaryName: string;
  requestId: string;
  status?: string;
  statusDescription?: string;
}


// export interface TransferStatus {
//   requestId: string;
//   transferStatus: string;
//   transferStatusDescription: string;
// }

// export interface TransferStatusResponse {
//   transfers: TransferStatus[];
  
// }

export interface Transfer {
  itemId: string;
  transferAmount: string;
  beneficiaryBankCode: string;
  beneficiaryBranchCode: string;
  accountTypeCode: string;
  accountNumber: string;
  beneficiaryName: string;
}

export interface RequestTransferStatus {
  itemId: string;
  status: string;
  statusDescription: string;
  applyNo: string;
  accountId: string;
  amount: string;
  currency: string;
  beneficiaryName: string;
  beneficiaryBankCode: string;
  beneficiaryBranchCode: string;
  transferDate: string;
  transferTime: string;
  completionDate?: string;
  completionTime?: string;
  failureReason?: string;
}

export interface TransferQueryBulkResponse {
  dateFrom: string;
  dateTo: string;
  requestTransferStatuses: RequestTransferStatus[];
  hasNext: string;
}

export interface TransferStatusResponse {
  acceptanceKeyClass: string;
  baseDate: string;
  baseTime: string;
  count: string;
  transferQueryBulkResponses: TransferQueryBulkResponse[];
  transferDetails: any[];
}
