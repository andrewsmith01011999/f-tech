import axiosInstance from '@/apis/request';
import { topicKeys } from '@/consts/factory/topic';
import { PaginationParams, Response } from '@/types';
import { Topic } from '@/types/topic/topic';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export type TopicListingParams = PaginationParams;

type TopicListingProps = {
    params: TopicListingParams;
};

export const useTopicsListing = ({ params }: TopicListingProps) => {
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
