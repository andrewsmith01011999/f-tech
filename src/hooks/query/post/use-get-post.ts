import axiosInstance from "@/apis/request";
import { postKeys } from "@/consts/factory/post";
import { Post } from "@/types/post/post";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useGetPost = (id: string) => {
    const fetchPost = async () : Promise<Post> => {
        const { data } = await axiosInstance.get(`/post/get/${id}`);

        return data;
    };

    return useQuery({
        queryKey: postKeys.get(id),
        queryFn: fetchPost,
        placeholderData: keepPreviousData,
        enabled: !!id,
    });
}