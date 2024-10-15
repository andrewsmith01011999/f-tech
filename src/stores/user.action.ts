import { LoginParams } from "@/types/user/login";
import { createAsyncAction } from "./action";
import { apiLogin } from "@/apis/user.api";
import { LocalStorageKeys } from "@/consts/local-storage";
import { setUserItem } from "./user";

export const loginAsync = createAsyncAction<LoginParams, boolean>(payload => {
    return async dispatch => {
        const { success, entity } = await apiLogin(payload);
    
        if (success && entity?.token) {
            localStorage.setItem(LocalStorageKeys.ACCESS_TOKEN_KEY, entity?.token);
            localStorage.setItem(LocalStorageKeys.REFRESH_TOKEN_KEY, entity?.refreshToken);
    
            dispatch(
            setUserItem({
                logged: true,
            }),
            );
    
            return true;
        }
    
        return false;
        };
});
  
  // export const loadProfile = createAsyncAction<string, boolean>(token => {
  //   return async dispatch => {
  //     const { result, status } = await apiAccount(token);
  
  //     if (result && status) {
  //       dispatch(
  //         setUserItem({
  //           userId: result.id,
  //           username: result.username,
  //           roles: result.roles.map(role => role.code),
  //         }),
  //       );
  
  //       return true;
  //     }
  
  //     return false;
  //   };
  // });