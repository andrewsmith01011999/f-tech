import axiosInstance from '@/apis/request';
import { CreatePostPayload } from '@/types/post/post';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useCreatePost = (options: UseMutationOptions<unknown, AxiosError<unknown>, CreatePostPayload> = {}) => {
    const createPost = async (payload: CreatePostPayload) => {
        const { data } = await axiosInstance.post('/post/create', payload);

        return data;
    };

    return useMutation<unknown, AxiosError<unknown>, CreatePostPayload>({
        mutationKey: ['post', 'create'],
        mutationFn: (payload) => createPost(payload),
        ...options,
    });
};
