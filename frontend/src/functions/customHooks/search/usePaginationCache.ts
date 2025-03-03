import { storeSuperCrudFilters } from "functions/storage/superCrud/superCrudFiltersStorage";
import { useState } from "react";
import { FiltersType, SearchItem } from "type/searchTypes";


type Cache = {
    [key: string]: SearchItem[]
};

export const usePaginationCache = (
    handleFetchPage: (newPage: number) => void, 
    filters: FiltersType, 
    onRenderChange: (() => void)|null = null,
    filtersStorageKey?: string,
): {
    changePageWithCache: (page: number) => void,
    onAfterFetch: (newFilters: FiltersType, page: number, items: SearchItem[]) => void,
    currentPage: number,
    items: SearchItem[],
    setCacheItem: (page: number, item: any) => void
} => {
    //cache
    const [cache, setCache] = useState<Cache>({});
    const getPageFromCache = (page: number) => {
        if(cache[page]) {
            return cache[page];
        }
        return null;
    }; 
    const addPageToCache = (page: number, items: any) => {
        setCache(cache => ({
            ...cache, 
            [page]: items
        }));
    };
    const setCacheItem = (page: number, item: any) => {
        setCache(cache => ({
            ...cache,
            [page]: cache[page].map(cacheItem => {
                if(cacheItem.id === item.id) {
                    return item;
                }
                return cacheItem;
            })
        }));
    }

    //currentPage
    const [currentPage, setCurrentPage] = useState(1);

    const changePageWithCache = (newPage: number) => {
        if(onRenderChange) {
            onRenderChange();
        }
        if(getPageFromCache(newPage)) {
            setCurrentPage(newPage);
        } else {
            handleFetchPage(newPage);
        }
        // store
        if(filtersStorageKey) {
            storeSuperCrudFilters(filtersStorageKey, {
                ...filters,
                page: newPage,
            });
        }
    };

    const [currentFilters, setCurrentFilters] = useState(filters);
    const onAfterFetch = (
        newFilters: FiltersType, 
        page: number, 
        items: SearchItem[]
    ): void => {
        //pour éviter qu'on pense que les filtres sont différents à chaque fois
        currentFilters.page = newFilters.page;
        //eslint-disable-next-line
        if(JSON.stringify(newFilters) != JSON.stringify(currentFilters)) {
            setCache({});
        }
        setCurrentFilters(newFilters)
        setCurrentPage(page);
        addPageToCache(page, items);
    };

    return { changePageWithCache, onAfterFetch, currentPage, items: getPageFromCache(currentPage) ?? [], setCacheItem }
}