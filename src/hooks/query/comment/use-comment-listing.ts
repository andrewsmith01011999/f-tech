import type { PaginationParams } from '@/types';
import type { TComment } from '@/types/comment/comment';

import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { request } from '@/apis/request';
import { commentKeys } from '@/consts/factory/comment';

type CommentListingProps = PaginationParams & {
    accountId?: string;
};

export const useCommentListing = () => {
    const fetchComments = async (): Promise<TComment[]> => {
        const { entity } = await request<TComment[]>('get', `/comment/getall`);

        return entity;
    };

    return useQuery<TComment[]>({
        queryKey: commentKeys.listing(),
        queryFn: fetchComments,
        placeholderData: keepPreviousData,
    });
};

export const useCurrentUserCommentListing = (params: CommentListingProps) => {
    const fetchCommentByCurrentUser = async (): Promise<TComment[]> => {
        const { entity } = await request<TComment[]>('get', `/comment/getall/by-current-user`, params, {
            paramsSerializer: {
                indexes: null,
            },
        });

        return entity;
    };

    return useQuery<TComment[]>({
        queryKey: commentKeys.listingParam(params),
        queryFn: fetchCommentByCurrentUser,
        placeholderData: keepPreviousData,
    });
};

// export const useOtherUserCommentListing = (params: CommentListingProps) => {
//     const fetchCommentByOtherUser = async (): Promise<TComment[]> => {
//         const { entity } = await request<TComment[]>('get', `/comment/getall/other-user`, params, {
//             paramsSerializer: {
//                 indexes: null,
//             },
//         });

//         return entity;
//     };

//     return useQuery<TComment[]>({
//         queryKey: commentKeys.listingParam(params),
//         queryFn: fetchCommentByOtherUser,
//         placeholderData: keepPreviousData,
//     });
// };

export const useOtherUserCommentListing = (id: string) => {
    const fetchComments = async (): Promise<TComment[]> => {
        const { entity } = await request<TComment[]>(
            'get',
            `/comment/getall/other-user/${id}`,
            {},
            {
                paramsSerializer: {
                    indexes: null,
                },
            },
        );

        return entity;
    };

    return useQuery<TComment[]>({
        queryKey: commentKeys.listingAnotherAccount(id),
        queryFn: fetchComments,
        placeholderData: keepPreviousData,
        enabled: !!id,
    });
};
