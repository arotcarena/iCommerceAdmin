import { convertPaginatedResponse } from "../../../api/convertor/apiPlatformConversion/paginatedResponseConvertor";
import { convertFiltersToApiPlatformFilters } from "functions/api/convertor/apiPlatformConversion/filtersConvertor";
import { ApiPlatformPaginatedType, FiltersType, PaginatedType, SearchItem } from "type/searchTypes";
import { useItemDeleteVoter } from "../voter/itemVoter";
import { useTranslation } from "react-i18next";
import { useAlert } from "Components/Contexts/AlertContext";
import { useCallback } from "react";
import { TabColumn } from "type/superCrudTypes";
import { useApiRequestWithControl } from "../useApiRequestWithControl";
import { useApiRequest } from "../useApiRequest";
import { convertDateToIsoWithoutLocaleTimezone } from "functions/api/convertor/dateConvertor";

/**
 * Special operations to adapt to api
 */
export const itemParamsPreparator = (data: {[key: string]: any}, columns: TabColumn[]) => {
    columns.forEach(col => {
        let value = data[col.name];
        // Change decimal to string
        if(col.type === 'decimal') {
            value = value.toString();
        }
        //change int and float
        if(col.type === 'float' && typeof value === 'string') {
            value = parseFloat(value);
        }
        if(['int', 'price'].includes(col.type) && typeof value === 'string') {
            value = parseInt(value);
        }
        //date type
        if(['date', 'datetime'].includes(col.type) && value) {
            value = value ? convertDateToIsoWithoutLocaleTimezone(value): null;
        }
        data = {
            ...data,
            [col.name]: value
        };
    });

    return data;
};


export const useLoadItems = (
    endpoint: string, 
    defaultItemsPerPage: number = 20,
    parentIri?: string,
    parentPropertyName?: string,
    columns?: TabColumn[], //provide columns if needs filters special preparation (ex: currency dataTransform)
    defaultHiddenFilters: {[key: string]: any} = {},
): ((filters: FiltersType) => Promise<PaginatedType<SearchItem>|null>) => {
    const doApiRequestWithControl = useApiRequestWithControl();

    const loadItems = useCallback(async (filters: FiltersType): Promise<PaginatedType<SearchItem>|null> => {
        // handle default hidden filters
        for(const [key, value] of Object.entries(defaultHiddenFilters)) {
            // if custom filter doesn't exists for this field, put default hidden filter
            if(filters[key] === undefined) {
                filters = {
                    ...filters,
                    [key]: value
                };
            }
        }

        // handle default itemsPerPage
        if(!filters.itemsPerPage) {
            filters = {...filters, itemsPerPage: defaultItemsPerPage};
        }

        // convert filters for apiPlatform
        filters = convertFiltersToApiPlatformFilters(filters, columns);

        // handle parent filter (on subCrud)
        if(parentIri && parentPropertyName) {
            filters = {
                ...filters,
                [parentPropertyName]: parentIri
            };
        }

        try {
            const response = await doApiRequestWithControl<ApiPlatformPaginatedType>(
                endpoint,
                filters,
                'GET',
                true,
            );
            //convert apiplatform paginated response to standard paginated response
            if(response) {
                return convertPaginatedResponse(response);
            }
            return null;
        } catch(e) {
            throw e;
        }
    }, [endpoint, defaultItemsPerPage, parentIri, parentPropertyName, columns]);

    return loadItems;
};

export const useShowItem = (
    endpoint: string, 
): ((id: number) => Promise<SearchItem>) => {
    const doApiRequest = useApiRequest();

    const showItem = (id: number): Promise<SearchItem> => {
        return doApiRequest(endpoint + '/' + id, {}, 'GET');
    };

    return showItem;
};

export const usePostItem = (
    endpoint: string,
    columns?: TabColumn[],//provide columns if needs special params preparation (ex: change decimal to string)
    parentIri?: string,
    parentPropertyName?: string
): ((data: object) => Promise<any>) => {
    const doApiRequest = useApiRequest();

    const postItem = (data: object): Promise<any> => {
        if(parentIri && parentPropertyName) {
            data = {
                ...data,
                [parentPropertyName]: parentIri
            };
        };
        if(columns) {
            data = itemParamsPreparator(data, columns);
        }

        return doApiRequest<any>(endpoint, data, 'POST');
    };

    return postItem;
};

export const useUpdateItem = (
    endpoint: string, 
    columns?: TabColumn[],//provide columns if needs special params preparation (ex: change decimal to string)
): ((id: number, item: object) => Promise<any>) => {
    const doApiRequest = useApiRequest();

    const updateItem = async (id: number, item: object): Promise<any> => {
        if(columns) {
            item = itemParamsPreparator(item, columns);
        }
        return doApiRequest(endpoint + '/' + id, item, 'PUT');
    };

    return updateItem;
};

export const usePatchItem = (
    endpoint: string,
    columns?: TabColumn[],//provide columns if needs special params preparation (ex: change decimal to string)
    parentIri?: string,
    parentPropertyName?: string
): ((id: number, data: object) => Promise<any>) => {
    const doApiRequest = useApiRequest();

    const patchItem = async (id: number, data: {parent?: any, [key: string]: any}): Promise<any> => {
        if(columns) {
            data = itemParamsPreparator(data, columns);
        }
        if(parentIri && parentPropertyName) {
            data = {
                ...data,
                [parentPropertyName]: parentIri
            };
        };

        return await doApiRequest(endpoint + '/' + id, data, 'PATCH');
    };

    return patchItem;
};

export const useDeleteItem = (
    endpoint: string, 
): ((id: number) => Promise<any>) => {
    const doApiRequest = useApiRequest();
    const canDeleteItem = useItemDeleteVoter(endpoint);

    const deleteItem = async (id: number): Promise<any> => {
        try {
            if(canDeleteItem(id)) {
                return await doApiRequest(endpoint + '/' + id, {}, 'DELETE');
            }
        } catch(e) {
            throw e;
        }
    };

    return deleteItem;
};

export const useDeleteItems = (
    endpoint: string, 
): ((ids: number[]) => Promise<void>) => {
    const doApiRequest = useApiRequest();

    const canDeleteItem = useItemDeleteVoter(endpoint);
    const {t} = useTranslation();
    const {createAlert} = useAlert();

    const deleteItems = async (ids: number[]): Promise<any> => {
        let errors = 0;
        let errorMessages = [];
        for(const id of ids) {
            try {
                if(canDeleteItem(id)) {
                    await doApiRequest(endpoint + '/' + id, {}, 'DELETE');
                }
            } catch(error: any) {
                errors += 1;
                if(error.message) {
                    errorMessages.push(error.message);
                }
            }
        }
        if(errors > 0) {
            for(const errorMessage of errorMessages) {
                createAlert('danger', errorMessage);
            }
            throw new Error(t('error.items_removal', {count: errors}));
        }
    };

    return deleteItems;
};
