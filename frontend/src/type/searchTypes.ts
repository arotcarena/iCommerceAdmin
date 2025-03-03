
export type SearchFilters = {
    page: number,
    [key: string]: any
};

export type Item = {
    id: number,
    [key: string]: any
};

export type SearchItem = Item;

export type PaginatedType<ItemType> = {
    items: ItemType[],
    count: number,
    maxPage: number,
    perPage: number,
    currentPage: number
};

export type SearchResult = PaginatedType<SearchItem>|null;

export type ApiPlatformPaginatedType = {
    ['hydra:member']: any[],
    ['hydra:view']: {
        ['hydra:last']: string,
        ['@id']: string
    },
    ['hydra:totalItems']: number
};


export type FiltersType = {
    [key: string]: any
}

