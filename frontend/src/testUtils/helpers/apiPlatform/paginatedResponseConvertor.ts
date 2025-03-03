import { ApiPlatformPaginatedType } from "type/searchTypes";

export const getPaginatedResponse = (
    items: any[],
    totalItems: number,
): ApiPlatformPaginatedType => {
    return {
        'hydra:member': items,
        'hydra:totalItems': totalItems,
        'hydra:view': {
            'hydra:last': '',
            '@id': ''
        }
    };
}