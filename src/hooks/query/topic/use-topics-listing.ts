import axiosInstance from '@/apis/request';
import { topicKeys } from '@/consts/factory/topic';
import { PaginationParams, Response } from '@/types';
import { Topic } from '@/types/topic/topic';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export type AlertListingParams = PaginationParams;

type AlertListingProps = {
    params: AlertListingParams;
};

export const useTopicsListing = ({ params }: AlertListingProps) => {
    const fetchTopics = async (): Promise<Response<Topic[]>> => {
        const { data } = await axiosInstance.get('/topic/getall', {
            params,
        });

        return data;
    };

    return useQuery<Response<Topic[]>>({
        queryKey: topicKeys.listing(params),
        queryFn: fetchTopics,
        placeholderData: keepPreviousData,
    });
};
