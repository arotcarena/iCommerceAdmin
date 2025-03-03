import { useQueryClient } from "@tanstack/react-query";
import { API_LOGIN } from "Routes/apiRoutes";
import { AppConfig } from "config/AppConfig";
import { customFetch } from "functions/api/customFetch/customFetch";
import { generateUrl } from "functions/router/urlGenerator";
import { destroyAuthTarget, getAuthTarget } from "functions/storage/auth/authTargetStorage";
import { storeAuthToken, storeRefreshAuthToken } from "functions/storage/auth/authTokenStorage";
import { useNavigate } from "react-router-dom";
import { LoginData } from "type/formTypes";


export const useLoginUser = (): (loginData: LoginData) => Promise<void> => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const loginUser = async (
        loginData : LoginData, 
        ) => {
        try {
            const data: {token: string, refresh_token: string} = await customFetch(
                AppConfig.API_BASE_URL + API_LOGIN,
                loginData,
                'POST'
            );
    
            //store authentication JWT
            storeAuthToken(data.token);
            storeRefreshAuthToken(data.refresh_token);

            //redirection
            const target = getAuthTarget();
            if(target) {
                //remove target
                destroyAuthTarget();
                //redirect to target
                navigate(target);
            } else {
                navigate(generateUrl('home'));
            }

            // invalidate menu cache because it can change if user has different roles
            queryClient.invalidateQueries({
                queryKey: ['menu']
            });
        } catch(e: any) {
            throw e;
        }
    };

    return loginUser;
}
