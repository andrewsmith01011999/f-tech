import axiosInstance from '@/apis/request';
import { tagKeys } from '@/consts/factory/tag';
import { PaginationParams, Response } from '@/types';
import { Tag } from '@/types/tag/tag';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export type TagListingParams = PaginationParams;

type TagListingProps = {
    params: TagListingParams;
};

export const useTagsListing = ({ params }: TagListingProps) => {
    const fetchTags = async (): Promise<Response<Tag>> => {
        const { data } = await axiosInstance.get('/tag/getall', {
            params,
        });

        return data;
    };

    return useQuery<Response<Tag>>({
        queryKey: tagKeys.listing(params),
        queryFn: fetchTags,
        placeholderData: keepPreviousData,
    });
};
