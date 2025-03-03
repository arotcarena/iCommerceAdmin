import { useAlert } from "Components/Contexts/AlertContext";
import { apiRequest } from "functions/api/apiRequest/apiRequest";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

/**
 * standard request to api
 * using function apiRequest
 */
export const useApiRequest = (): <T>(
        endpoint: string,
        params?: {[key: string]: any},
        method?: string,
        sendAuthToken?: boolean,
        controller?: AbortController,
    ) => Promise<T> => {

    const {t} = useTranslation();
    const history = useNavigate();
    const location = useLocation();
    const {createAlert} = useAlert();

    const doApiRequest = <T>(
        endpoint: string,
        params: {[key: string]: any} = {},
        method: string = 'GET',
        sendAuthToken: boolean = true,
        controller?: AbortController,
    ): Promise<T> => {
        return apiRequest<T>(
            endpoint,
            params,
            method,
            history,
            location,
            createAlert,
            t,
            sendAuthToken,
            controller,
        );
    }

    return doApiRequest;
}
