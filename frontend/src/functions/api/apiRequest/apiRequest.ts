import { AppConfig } from "config/AppConfig"
import { CustomFetchError, customFetch } from "../customFetch/customFetch"
import { NavigateFunction } from "react-router-dom";
import { generateUrl } from "functions/router/urlGenerator";
import { prepareApiRequest } from "./apiRequestPreparator";
import { tryRefreshToken } from "functions/auth/tryRefreshToken";
import { createAlertTextFromApiError } from "../error/createAlertTextFromApiError";


export const apiRequest = async <T>(
    path: string,
    params: object = {},
    method: string = 'GET',
    history: NavigateFunction,
    location: {pathname: string},
    createAlert: (color: string, message: TrustedHTML | string) => void,
    t: Function,
    sendAuthToken: boolean = true,
    controller?: AbortController,
): Promise<T> => {

    const {customHeaders, preparedParams, urlParams} = prepareApiRequest(method, params, sendAuthToken);

    try {
        return await customFetch(
            AppConfig.API_BASE_URL + path,
            preparedParams,
            method,
            customHeaders,
            urlParams,
            controller,
        );
    } catch(e) {
        if(e instanceof CustomFetchError) {
            // Errors leading to a redirection
            if(history) {
                if(e.status === 401) {
                    const success = await tryRefreshToken(history, location);
                    if(success) {
                        // if refresh success, resend request
                        return apiRequest(path, params, method, history, location, createAlert, t, sendAuthToken, controller);
                    }
                } else if(e.status === 403) {
                    history(generateUrl('error_403'));
                } else if(e.status === 404) {
                    history(generateUrl('error_404'));
                } else if(e.status === 409) {
                    if(createAlert) {
                        createAlert('danger', e.data?.message ?? 'Cannot access this ressource.');
                    }
                    history(generateUrl('login'));
                }
            }
            // Standard error response
            if(e.status >= 500 && e.status <= 600 && e instanceof CustomFetchError) {
                createAlert('danger', createAlertTextFromApiError(e, t));
            }
        } else if(e instanceof DOMException && e.name === 'AbortError') {
            // ignore abort errors
        } else {
            // Unknown errors : e.g. CORS errors
            createAlert('danger', t('error.server'));
        }
        throw e;
    }
}
