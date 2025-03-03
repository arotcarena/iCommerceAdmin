import { generateUrl } from "functions/router/urlGenerator";
import { storeAuthTarget } from "functions/storage/auth/authTargetStorage";
import { getAuthToken } from "functions/storage/auth/authTokenStorage";
import { PropsWithChildren, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const AuthGrantedWrapper = ({children}: PropsWithChildren) => {

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if(!getAuthToken()) {
            storeAuthTarget(location.pathname);
            navigate(generateUrl('login'));
        }
    // eslint-disable-next-line
    }, []);

    return children;
}