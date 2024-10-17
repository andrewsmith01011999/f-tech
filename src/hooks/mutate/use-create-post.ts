import axiosInstance from '@/apis/request';
import { CreatePostPayload } from '@/types/post/post';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

export const useCreatePost = (options: UseMutationOptions<unknown, unknown, CreatePostPayload> = {}) => {
    const createPost = async (payload: CreatePostPayload) => {
        const { data } = await axiosInstance.post('/post/create', payload);
    };

    return useMutation<unknown, unknown, CreatePostPayload>({
        mutationFn: (payload: CreatePostPayload) => createPost(payload),
        ...options,
    });
};
