import { apiGetWalletByAccountId } from "@/apis/wallet.api";
import { authKeys } from "@/consts/factory/auth";
import { RootState } from "@/stores";
import { setAccountState } from "@/stores/account";
import { Wallet } from "@/types/account";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";

export const useWallet = () => {
    const dispatch = useDispatch();
    const { accountId } = useSelector((state: RootState) => state.account)

    const getwallet = async (): Promise<Wallet | undefined> => {
        if (!accountId) {
            return undefined;
        }

        const response = await apiGetWalletByAccountId(accountId)

        if (response.success && response.entity) {
            const { entity } = response;

            dispatch(
                setAccountState({
                    wallet: entity
                })
            )

            return entity;
        }

        return;
    }

    return useQuery<Wallet | undefined>({
        queryKey: authKeys.profile(),
        queryFn: getwallet,
        placeholderData: keepPreviousData,
        enabled: !!accountId
    });
}