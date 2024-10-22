import { apiSignIn } from "@/apis/auth.api";
import { LocalStorageKeys } from "@/consts/local-storage";
import { SignInRequest } from "@/types/auth";
import { setAccountState } from "./account";
import { createAsyncAction } from "./action";

export const loginAsync = createAsyncAction<SignInRequest, boolean>(payload => {
    return async dispatch => {
        const { success, entity } = await apiSignIn(payload);
    
        if (success && entity?.token) {
            localStorage.setItem(LocalStorageKeys.ACCESS_TOKEN_KEY, entity?.token);
            localStorage.setItem(LocalStorageKeys.REFRESH_TOKEN_KEY, entity?.refreshToken);
    
            dispatch(
                setAccountState({
                    logged: true,
                }),
            );
    
            return true;
        }
    
        return false;
        };
});
