import axiosInstance from '@/apis/request';
import { postKeys } from '@/consts/factory/post';
import { PaginationParams, Response } from '@/types';
import { Post } from '@/types/post/post';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export type PostListingParams = PaginationParams;

type PostListingProps = {
    params: PostListingParams;
};

export const usePostsListing = ({ params }: PostListingProps) => {
    const fetchPosts = async (): Promise<Response<Post[]>> => {
        const { data } = await axiosInstance.get<Response<Post[]>>('/post/getall', {
            params,
        });

        return data;
    };

    return useQuery<Response<Post[]>>({
        queryKey: postKeys.listing(params),
        queryFn: fetchPosts,
        placeholderData: keepPreviousData,
    });
};
