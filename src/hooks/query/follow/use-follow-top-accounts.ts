import { request } from "@/apis/request";
import { followKeys } from "@/consts/factory/follow";
import { Account } from "@/types/account"
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useGetFollowTopAccounts = () => {
  const fetchPostTopAccounts = async () : Promise<Account[]> => {
    const {entity} = await request<Account[]>('get', `/follow/top-followed-accounts`);

    return entity;
  }

  return useQuery({
    queryKey:followKeys.topAccounts(),
    queryFn: fetchPostTopAccounts,
    placeholderData: keepPreviousData,
  })

}