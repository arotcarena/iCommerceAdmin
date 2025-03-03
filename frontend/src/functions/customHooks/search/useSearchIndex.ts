import { useEffect, useRef, useState } from "react";
import { usePaginationCache } from "./usePaginationCache";
import { FiltersType, PaginatedType, SearchItem, SearchResult } from "type/searchTypes";
import { useLocation } from "react-router-dom";

type Params = {
    itemsPerPage?: number,
    [key: string]: any
};



export const useSearchIndex = (
    queryFn: (filters: FiltersType) => Promise<SearchResult>,
    filters: FiltersType,
    handleFetchPage: (page: number) => void,
    onRenderChange: (() => void)|null = null,
    filtersStorageKey?: string,
    timeout: number = 300
): {
    result: SearchResult,
    forceFetch: () => void,
    isLoading: boolean,
    changePageWithCache: (newPage: number) => void,
    error: any
} => {
    const {pathname} = useLocation();

    //load data
    //with timeout
    const [result, setResult] = useState<SearchResult>(null);
    const [error, setError] = useState<any>(null);
    const isLoading = useRef<boolean>(false);
    const [timer, setTimer] = useState<any>(null);
    useEffect(() => {
        if(timer) {
            clearTimeout(timer);
            setTimer(null);
        }
        isLoading.current = true;
        const currentTimer = setTimeout(() => {
            doFetch();
        }, timeout);
        setTimer(currentTimer);
    //eslint-disable-next-line
    }, [filters, queryFn]);

    const doFetch = async (forceParams?: Params) => {
        isLoading.current = true;
        let params = filters;
        try {
            if(forceParams) {
                params = {
                    ...params,
                    ...forceParams
                };
            }
            const response = await queryFn(params);
            setResult(response);
            
            // in case of aborted request, response is null
            if(response !== null) {
                isLoading.current = false;
            }
        } catch(e) {
            setError(e);
            isLoading.current = false;
        }
        setTimer(null);
    }

    //initial behaviour
    const [isInitialLoading, setInitialLoading] = useState<boolean>(true);
    useEffect(() => {
        if(isLoading) {
            //ex: scroll top when render change 
            //we don't do it on first render
            if(!isInitialLoading && onRenderChange) {
                const parts = pathname.split('/');
                if(parts[parts.length - 2] !== 'update') {
                    onRenderChange();
                }
            }
            setInitialLoading(false);
        }
    //eslint-disable-next-line
    }, [isLoading]);
    
    //Pagination cache
    const {changePageWithCache, onAfterFetch, currentPage, items} = usePaginationCache(handleFetchPage, filters, onRenderChange, filtersStorageKey);
    useEffect(() => {
        if(result) {
            onAfterFetch(filters, result.currentPage, result.items);
        }
    //eslint-disable-next-line
    }, [result]);


    //we need to provide page from pagination cache, and not from filters which is the case by default
    const forceFetch = () => {
        doFetch({page: currentPage});
    }

    return {
        result: {
            items: items,
            count: result ? result.count: 0,
            maxPage: result ? result.maxPage: 1,
            perPage: result ? result.perPage: 10,
            currentPage: currentPage
        },
        forceFetch, 
        isLoading: isLoading.current,
        changePageWithCache,
        error
    };
}
