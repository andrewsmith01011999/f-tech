import { apiGetAccount } from "@/apis/account.api";
import { authKeys } from "@/consts/factory/auth";
import { LocalStorageKeys } from "@/consts/local-storage";
import { setAccountState } from "@/stores/account";
import { Account } from "@/types/account";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

export const useProfile = () => {
    const dispatch = useDispatch();
    const username = localStorage.getItem(LocalStorageKeys.USERNAME_KEY) ?? "";

    const getProfile = async (): Promise<Account | undefined> => {
        if (!username) {
            return undefined;
        }

        const response = await apiGetAccount({
            username: username
        })

        if (response.success && response.entity) {
            const { entity } = response;
            
            dispatch(
                setAccountState({
                    logged: true,
                    accountId: entity.accountId,
                    avatar: entity.avatar,
                    coverImage: entity.coverImage,
                    username: entity.username,
                    createdDate: entity.createdDate,
                    status: entity.status,
                    role: entity.role?.name
                })
            )
            return entity;
        }

        return ;
    }

    return useQuery<Account | undefined>({
        queryKey: authKeys.profile(),
        queryFn: getProfile,
        placeholderData: keepPreviousData,
    });
}