import { useEffect, useState } from 'react';
import { useApiRequestWithControl } from './useApiRequestWithControl';

/**
 * Manage a query state
 * using custom hook useApiQuery
 * adding a delay between requests
 * adding abort controller to abort previous request if pending
 */
export const useApiQueryWithControl = <T>(
    endpoint: string, 
    params: {[key: string]: any} = {}, 
    method: string = 'GET',
    delay: number = 300,
    canStartLoad: boolean = true, // use this if you want to control the moment of first loading
    sendAuthToken: boolean = true,
): {
    data: T|null,
    doFetch: (overrideParams?: {[key: string]: any}) => void,
    isLoading: boolean,
    error: any,
    reset: () => void,
} => {
    const doApiRequestWithControl = useApiRequestWithControl();

    const [isLoading, setLoading] = useState(false);
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<any>(null);
    const [timer, setTimer] = useState<NodeJS.Timeout|null>(null);

    useEffect(() => {
        if(!canStartLoad) {
            return;
        }
        if(timer) {
            clearTimeout(timer);
            setTimer(null);
        }
        setLoading(true);
        const currentTimer = setTimeout(() => {
            doFetch();
        }, delay);
        setTimer(currentTimer);
    //eslint-disable-next-line
    }, [endpoint, method, params, sendAuthToken, canStartLoad]);


    const doFetch = async (overrideParams?: {[key: string]: any}) => {
        setLoading(true);

        try {
            const responseData = await doApiRequestWithControl<T>(
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
        setTimer(null);
    };

    const reset = () => {
        setData(null);
        setLoading(false);
    }

    return {
        data,
        doFetch,
        isLoading,
        error,
        reset
    };
}
