import axiosInstance from '@/apis/request';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export type BuyPointsPayload = {
    monkeyCoinPackId: string;
    redirectUrl: string;
};

export const useBuyPoints = (options: UseMutationOptions<unknown, AxiosError<unknown>, BuyPointsPayload> = {}) => {
    const createBuyPoints = async (payload: BuyPointsPayload) => {
        const { data } = await axiosInstance.post(`/payment/buyPoints`, {
            data: payload,
        });

        return data;
    };

    return useMutation<
        {
            code: string;
            message: string;
            paymentUrl: string;
        },
        AxiosError<unknown>,
        BuyPointsPayload
    >({
        mutationKey: ['payment', 'buyPoints'],
        mutationFn: payload => createBuyPoints(payload),
        ...options,
    });
};
