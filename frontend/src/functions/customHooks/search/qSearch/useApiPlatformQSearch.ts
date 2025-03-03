import { useMemo } from "react"
import { convertPaginatedResponse } from "functions/api/convertor/apiPlatformConversion/paginatedResponseConvertor";
import { ApiPlatformPaginatedType, PaginatedType } from "type/searchTypes";
import { useApiQueryWithControl } from "../../api/useApiQueryWithControl";

export const useApiPlatformQSearch = <T>(
    endpoint: string,
    q: string,
    qParameterName: string = 'q',
    maxItems: number = 10,
    delay: number = 300,
    defaultFilters?: {[key: string]: any},
    canStartLoad: boolean = true, // use this if you want to control the moment of first loading
): {
    data: PaginatedType<T>|null,
    isLoading: boolean,
    error: any,
    reset: () => void
} => {

    const filters = useMemo(() => {
        return {
            ...defaultFilters,
            itemsPerPage: maxItems,
            [qParameterName]: q
        };
    }, [q, defaultFilters, maxItems]);

    const {data, isLoading, error, reset} = useApiQueryWithControl<ApiPlatformPaginatedType>(endpoint, filters, 'GET', delay, canStartLoad);

    return {
        data: data ? convertPaginatedResponse(data): null,
        isLoading,
        error,
        reset
    }
}
