import { Item } from "type/searchTypes";
import { useApiRequest } from "../useApiRequest";

export const useShowItemFromIri = (): ((iri: string) => Promise<Item>) => {
    const doApiRequest = useApiRequest();

    /**
     * data can be either an iri or an object containing '@id'
     * 
     * @param string|{'@id': number, [key: string]: any}) data
     * @returns 
     */
    const showItem = (data: string|{id: number, [key: string]: any}): Promise<Item> => {
        const iri = typeof data === 'string' ? data: data['@id'];
        return doApiRequest<Item>(iri, {}, 'GET');
    };

    return showItem;
};
