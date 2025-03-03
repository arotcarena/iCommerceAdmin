import { useRef } from 'react';
import { useApiRequest } from './useApiRequest';

/**
 * request to api
 * using custom hook useApiRequest
 * adding abort controller to abort previous request if pending
 */
export const useApiRequestWithControl = (): <T>(
    endpoint: string,
    params?: {[key: string]: any},
    method?: string,
    sendAuthToken?: boolean,
) => Promise<T|null> => {

    const doApiRequest = useApiRequest();

    const abortControllerRef = useRef<AbortController|null>(null);

    const doApiRequestWithControl = async <T>(
        endpoint: string,
        params: {[key: string]: any} = {},
        method: string = 'GET',
        sendAuthToken: boolean = true,
    ): Promise<T|null> => {

        // if another request is pending, cancel it
        if(abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        const controller = new AbortController();
        abortControllerRef.current = controller;

        try {
            const data = await doApiRequest<T>(
                endpoint,
                params,
                method,
                sendAuthToken,
                controller
            );
            return data;
        } catch(e: any) {
            if(e.name === 'AbortError') {
                return null;
            }
            throw e;
        }
    };

    return doApiRequestWithControl;
}
