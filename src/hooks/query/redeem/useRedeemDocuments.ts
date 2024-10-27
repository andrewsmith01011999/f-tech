import { request } from '@/apis/request';
import { redeemKeys } from '@/consts/factory/redeem';
import { Redeem } from '@/types/redeem/redeem';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export const useRedeemDocuments = () => {
    const fetchRedeemDocuments = async (): Promise<Redeem> => {
        const { entity } = await request<Redeem>('get', '/redeem/my-document');

        return entity;
    };

    return useQuery<Redeem>({
        queryKey: redeemKeys.documents(),
        queryFn: fetchRedeemDocuments,
        placeholderData: keepPreviousData,
    });
};
