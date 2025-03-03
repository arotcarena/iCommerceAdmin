import { apiRefreshToken } from "functions/customHooks/api/queries/authQueries";
import { generateUrl } from "functions/router/urlGenerator";
import { storeAuthTarget } from "functions/storage/auth/authTargetStorage";
import { destroyAuthToken, getRefreshAuthToken, storeAuthToken } from "functions/storage/auth/authTokenStorage";
import { storeUnauthorizedEvent } from "functions/storage/auth/unauthorizedStorage";
import { NavigateFunction } from "react-router-dom";

export const tryRefreshToken = async (
    navigate: NavigateFunction,
    location: {pathname: string}
): Promise<boolean> => {
    const onUnauthorized = () => {
        storeAuthTarget(location.pathname);
        storeUnauthorizedEvent();
        destroyAuthToken();
        navigate(generateUrl('login'));
    }

    const refreshToken = getRefreshAuthToken();
    if(refreshToken) {
        try {
            const data = await apiRefreshToken(refreshToken);
            if(data.token) {
                storeAuthToken(data.token);
                return true;
            }
        } catch(e) {
            //
        }
    }
    onUnauthorized();
    return false;
}
