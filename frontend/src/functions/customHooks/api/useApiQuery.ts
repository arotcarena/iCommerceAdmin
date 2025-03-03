import { useEffect, useState } from "react"
import { useApiRequest } from "./useApiRequest";

/**
 * Manage a query state
 * using custom hook useApiRequest
 */
export const useApiQuery = <T>(
    endpoint: string,
    params: {[key: string]: any} = {},
    autoRequest: boolean = false,
    sendAuthToken: boolean = true,
): {
    data: T,
    isLoading: boolean,
    error: any,
    doRequest: (overrideParams?: {[key: string]: any}) => void
} => {

    const doApiRequest = useApiRequest();

    const [data, setData] = useState<any>(null);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<any>(null);

    const doRequest = async (
        overrideParams?: Object
    ) => {
        if(isLoading) {
            return;
        }
        setLoading(true);
        try {
            const responseData = await doApiRequest(
                endpoint,
                overrideParams ?? params,
                'GET',
                sendAuthToken,
            );
            setData(responseData);
        } catch(e) {
            setError(e);
        }
        setLoading(false);
    }

    useEffect(() => {
        if(autoRequest) {
            doRequest();
        }
    }, [endpoint, params, sendAuthToken]);

    return {
        data,
        isLoading,
        error,
        doRequest
    }
}
