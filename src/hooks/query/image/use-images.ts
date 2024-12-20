import { request } from "@/apis/request";
import { imageKeys } from "@/consts/factory/image";
import { ImageResponse } from "@/types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useImagesCurrentUser = () => {
    const fetchImagesCurrentUser = async (): Promise<ImageResponse[]> => {
        const { entity } = await request<ImageResponse[]>('get', `/image/getall/by-current-account`);

        return entity;
    };

    return useQuery({
    queryKey: imageKeys.currentUser(),
        queryFn: fetchImagesCurrentUser,
        placeholderData: keepPreviousData,
    });
}

export const useImagesOtherUser = (userId: string) => {
    const fetchImagesOtherUser = async (): Promise<ImageResponse[]> => {
        const { entity } = await request<ImageResponse[]>('get', `/image/getall/other-user/${userId}`);

        return entity;
    };

    return useQuery({
    queryKey: imageKeys.otherUser({ userId }),
        queryFn: fetchImagesOtherUser,
        placeholderData: keepPreviousData,
        enabled: !!userId,
    });
}