import { apiSignUp } from '@/apis/auth.api';
import { SignUpRequest } from '@/types/auth';
import { DefaultError, useMutation, UseMutationOptions } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';

export const useSignUp = (options: UseMutationOptions<boolean, DefaultError, SignUpRequest> = {}) => {
    const signIn = async (payload: SignUpRequest) => {
        return apiSignUp(payload);
    };

    return useMutation<any, DefaultError, SignUpRequest>({
        mutationKey: ['auth', 'signup'],
        mutationFn: signIn,
        ...options,
    });
};
