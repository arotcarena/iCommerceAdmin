import { ApiPlatformPaginatedType } from "type/searchTypes";
import { useApiRequest } from "../useApiRequest";
import { API_ADDRESSES } from "Routes/apiRoutes";
import { convertPaginatedResponse } from "functions/api/convertor/apiPlatformConversion/paginatedResponseConvertor";
import { AddressType } from "type/formTypes";

export const useLoadAddresses = (): ((filters: {[key: string]: any}) => Promise<AddressType[]>) => {
    
    const doApiRequest = useApiRequest();

    const loadAddresses = async (filters: {[key: string]: any}): Promise<AddressType[]> => {
        const response = await doApiRequest<ApiPlatformPaginatedType>(API_ADDRESSES, {
            ...filters,
            itemsPerPage: 1000 // we want all results
        }, 'GET');
        return convertPaginatedResponse(response).items;
    };

    return loadAddresses;
};
