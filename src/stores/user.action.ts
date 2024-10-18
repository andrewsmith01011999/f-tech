import { apiSignIn } from "@/apis/user.api";
import { LocalStorageKeys } from "@/consts/local-storage";
import { SignInRequest } from "@/types/user/auth";
import { createAsyncAction } from "./action";
import { setUserState } from "./user";

export const loginAsync = createAsyncAction<SignInRequest, boolean>(payload => {
    return async dispatch => {
        const { success, entity } = await apiSignIn(payload);
    
        if (success && entity?.token) {
            localStorage.setItem(LocalStorageKeys.ACCESS_TOKEN_KEY, entity?.token);
            localStorage.setItem(LocalStorageKeys.REFRESH_TOKEN_KEY, entity?.refreshToken);
    
            dispatch(
                setUserState({
                    logged: true,
                }),
            );
    
            return true;
        }
    
        return false;
        };
});
