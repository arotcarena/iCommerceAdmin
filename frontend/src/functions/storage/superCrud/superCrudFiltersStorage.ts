import { FiltersType } from "type/searchTypes";

export const storeSuperCrudFilters = (storageKey: string, filters: FiltersType): void => {
    localStorage.setItem(
        getSuperCrudFiltersStorageKey(storageKey), 
        JSON.stringify(filters)
    );
}

export const getSuperCrudStoredFilters = (storageKey: string): FiltersType|null => {
    const data = localStorage.getItem(
        getSuperCrudFiltersStorageKey(storageKey)
    );

    if(data) {
        return JSON.parse(data);
    }
    return null;
}

export const resetSuperCrudStoredFilters = (storageKey: string) => {
    localStorage.removeItem(
        getSuperCrudFiltersStorageKey(storageKey)
    );
}

const getSuperCrudFiltersStorageKey = (storageKey: string): string => {
    return 'supercrud_' + storageKey + '.filters';
}
