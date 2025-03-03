export const getPageNumber = (iri: string|undefined): number => {
    if(!iri) {
        return 1;
    }
    const match = iri.match(/page=(\d+)/);
    return match ? parseInt(match[1]): 1;
};

export const getItemsPerPage = (iri: string|undefined): number => {
    if(!iri) {
        return 10;
    }
    const match = iri.match(/itemsPerPage=(\d+)/);
    return match ? parseInt(match[1]): 10;
};
