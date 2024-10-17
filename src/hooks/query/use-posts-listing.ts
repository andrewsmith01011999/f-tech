import axiosInstance from '@/apis/request';
import { postKeys } from '@/consts/factory/post';
import { PaginationParams, Response } from '@/types';
import { Topic } from '@/types/topic/topic';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export type PostListingParams = PaginationParams;

type PostListingProps = {
    params: PostListingParams;
};

export const usePostsListing = ({ params }: PostListingProps) => {
    const fetchPosts = async (): Promise<Response<Topic>> => {
        const { data } = await axiosInstance.get<Response<Topic>>('/post/getall', {
            params,
        });

        return data;
    };

    return useQuery<Response<Topic>>({
        queryKey: postKeys.listing(params),
        queryFn: fetchPosts,
        placeholderData: keepPreviousData,
    });
};
