import type { Account } from '@/types/account';
import type { Follow } from '@/types/follow';

import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { request } from '@/apis/request';
import { followKeys } from '@/consts/factory/follow';

export const useGetFollowTopAccounts = () => {
    const fetchPostTopAccounts = async (): Promise<Account[]> => {
        const { entity } = await request<Account[]>('get', `/follow/get-follows`);

        return entity;
    };

    return useQuery({
        queryKey: followKeys.topAccounts(),
        queryFn: fetchPostTopAccounts,
        placeholderData: keepPreviousData,
    });
};

export const useGetFollows = () => {
    const fetchFollows = async (): Promise<Account[]> => {
        const { entity } = await request<Account[]>('get', `/follow/get-follows`);

        return entity;
    };

    return useQuery({
        queryKey: followKeys.listing(),
        queryFn: fetchFollows,
        placeholderData: keepPreviousData,
    });
};

export const useGetFollowers = () => {
    const fetchFollowers = async (): Promise<Account[]> => {
        const { entity } = await request<Account[]>('get', `/follow/get-followers`);

        return entity;
    };

    return useQuery({
        queryKey: followKeys.listingFollower(),
        queryFn: fetchFollowers,
        placeholderData: keepPreviousData,
    });
};
