import { useApiRequest } from "../useApiRequest";

export const useBasicQuery = (): ((endpoint: string, params?: object, method?: string) => Promise<any>) => {
    const doApiRequest = useApiRequest();

    const basicQuery = async (endpoint: string, params: object = {}, method: string = 'GET') => {
        return doApiRequest<any>(endpoint, params, method);
    }

    return basicQuery;
};
