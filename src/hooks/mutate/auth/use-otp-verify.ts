import axiosInstance from "@/apis/request";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

export type OtpVerifyPayload = {
    email: string;
    otp: string;
}

export const useOtpVerify = (options: UseMutationOptions<unknown, AxiosError<unknown>, OtpVerifyPayload> = {}) => {
    const otpVerify = async (payload: OtpVerifyPayload) => {
      return axiosInstance.post('/authenticate/otp-verify', payload);
    };

    return useMutation<unknown, AxiosError<unknown>, OtpVerifyPayload>({
        mutationKey: ['auth', 'otp-verify'],
        mutationFn: payload => otpVerify(payload),
        ...options,
    });
};