import axiosInstance from '@/apis/request';
import { categoryKeys } from '@/consts/factory/category';
import { PaginationParams, Response } from '@/types';
import { Category } from '@/types/category/category';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export type CategoryListingParams = PaginationParams;

type CategoryListingProps = {
    params: CategoryListingParams;
};

export const useCategoriesListing = ({ params }: CategoryListingProps) => {
    const fetchCategories = async (): Promise<Response<Category[]>> => {
        const { data } = await axiosInstance.get<Response<Category[]>>('/category/getall', {
            params,
        });

        return data;
    };

    return useQuery<Response<Category[]>>({
        queryKey: categoryKeys.listing(params),
        queryFn: fetchCategories,
        placeholderData: keepPreviousData,
    });
};
