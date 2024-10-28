import { request } from '@/apis/request';
import { redeemKeys } from '@/consts/factory/redeem';
import { Redeem, RedeemDocument } from '@/types/redeem/redeem';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export const useRedeemDocuments = () => {
    const fetchRedeemDocuments = async (): Promise<RedeemDocument[]> => {
        const { entity } = await request<RedeemDocument[]>('get', '/reward/getAll');

        return entity;
    };

    return useQuery<RedeemDocument[]>({
        queryKey: redeemKeys.documents(),
        queryFn: fetchRedeemDocuments,
        placeholderData: keepPreviousData,
    });
};
