
import { ApiPlatformPaginatedType, PaginatedType } from "type/searchTypes";
import { getItemsPerPage, getPageNumber } from "./hydra/iriDataExtractor";


export const convertPaginatedResponse = (
    response: ApiPlatformPaginatedType
): PaginatedType<any> => {

    return {
        items: response['hydra:member'],
        count: response['hydra:totalItems'],
        maxPage: getPageNumber(response['hydra:view']['hydra:last']),
        perPage: getItemsPerPage(response['hydra:view']['@id']),
        currentPage: getPageNumber(response['hydra:view']['@id'])
    };
}