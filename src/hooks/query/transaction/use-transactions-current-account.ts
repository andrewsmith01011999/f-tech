import { request } from "@/apis/request";
import { transactionKeys } from "@/consts/factory/transaction";
import { Transaction } from "@/types/transaction/transaction";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useTransactionsCurrentAccount = () => {
  const fetchTransactionsCurrentAccount = async () : Promise<Transaction[]> => {
    const {
      entity
    } = await request<Transaction[]>('get', '/transaction/get-transactions-of-current-account', {
      params: {
        indexes: null
      }
    });
    return entity;
  };

  return useQuery<Transaction[]>({
    queryKey: transactionKeys.currentAccount(),
    queryFn: fetchTransactionsCurrentAccount,
    placeholderData: keepPreviousData
  });
}