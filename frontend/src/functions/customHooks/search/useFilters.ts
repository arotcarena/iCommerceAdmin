import { getSuperCrudStoredFilters, storeSuperCrudFilters } from "functions/storage/superCrud/superCrudFiltersStorage";
import { useEffect, useMemo, useState } from "react";
import { FiltersType } from "type/searchTypes";


const showFilter = (name: string, value: any, baseValue: any): boolean => {
    if(
        name !== 'sortBy'
        && 
        name !== 'page'
        &&
        name !== 'itemsPerPage'
        &&
        value !== ''
        &&
        value !== null
        &&
        value !== undefined
        &&
        JSON.stringify(value) !== JSON.stringify([])
        &&
        JSON.stringify(baseValue) !== JSON.stringify(value)
    ) {
        return true;
    }
    return false;
}

const countFilters = (filters: object, baseFilters: {[key: string]: any}): number => {
    let counted: string[] = [];
    for(const [key, value] of Object.entries(filters)) {
        if(
            showFilter(key, value, baseFilters[key]) ||
            key == 'sortBy' && value
        ) {
            counted.push(key);
        }
    }

    return counted.length;
}


/**
 * @param baseFilters (e.g. {page: 1}) not visible - not deletable - overridable
 * @param defaultFilters visible - deletable - overridable
 */
export const useFilters = (
    baseFilters: FiltersType = {},
    defaultFilters?: FiltersType,
    storageKey?: string
): {
    filters: FiltersType,
    setFilterValue: (name: string, value: any) => void,
    countFilters: number,
    resetFilters: () => void,
    changePage: (page: number) => void,
    resetFilter: (name: string) => void,
    canShowFilter: (name: string) => boolean
} => {
    //initial values
    const initialFilters = useMemo(() => {
        let initFilters: FiltersType = {};
        if(storageKey) {
            const storedFilters = getSuperCrudStoredFilters(storageKey);
            if(storedFilters) {
                initFilters = storedFilters;
            }
        }
        if(Object.values(initFilters).length === 0) {
            initFilters = baseFilters;
        }
        if(defaultFilters) {
            initFilters = {
                ...initFilters,
                ...defaultFilters
            };
        }
        return initFilters;
    }, [storageKey]);

    const [filters, setFilters] = useState<FiltersType>(initialFilters);

    //store filters in sessionStorage
    useEffect(() => {
        if(storageKey) {
            storeSuperCrudFilters(storageKey, filters);
        }
    }, [filters]);

    const count = useMemo(() => {
        return countFilters(filters, baseFilters);
    }, [filters, baseFilters]);

    const setFilterValue = (name: string, value: any) => {
        // for text filters
        // when input value is '' we must reset filter
        if(value === '') {
            resetFilter(name);
            return;
        }
        setFilters(filters => ({
            ...filters,
            page: baseFilters.page ?? 1,
            [name]: value,
        }));
    };

    const resetFilters = () => {
        setFilters(baseFilters);
    };

    const resetFilter = (name: string) => {
        setFilterValue(name, baseFilters[name]);
    };

    const canShowFilter = (name: string): boolean => {
        return showFilter(name, filters[name], baseFilters[name]);
    }

    const changePage = (newPage: number) => {
        setFilterValue('page', newPage);
    };

    return {
        filters,
        setFilterValue,
        countFilters: count,
        resetFilters,
        changePage,
        resetFilter,
        canShowFilter
    }
}
