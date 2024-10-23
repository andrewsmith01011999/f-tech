import { apiSignIn } from "@/apis/auth.api";
import { setAccountState } from "@/stores/account";
import { SignInRequest } from "@/types/auth";
import { DefaultError, useMutation, UseMutationOptions } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

export const useSignIn = (options: UseMutationOptions<boolean, DefaultError, SignInRequest> = {}) => {
    const dispatch = useDispatch()
    
    const signIn = async (payload: SignInRequest) => {
        const {username} = payload;

        const response = await apiSignIn(payload);
        if (response.success && response.entity) {
            const entity = response.entity;

            dispatch(
                setAccountState({
                    logged: true,
                    username: username,
                    token: entity.token,
                    refreshToken: entity.refreshToken
                }),
            );

            return true;
        }

        return false;
    };

    return useMutation<boolean, DefaultError, SignInRequest>({
        mutationKey: ['auth', 'signin'],
        mutationFn: signIn,
        ...options,
    });
} 