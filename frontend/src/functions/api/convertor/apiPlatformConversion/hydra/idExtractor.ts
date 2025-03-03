import { Item } from "type/searchTypes";

/**
 * @param {string|Item} data IRI or complete Item
 * @returns {number} id
 */
export const extractItemId = (data: string|Item) => {
    if(typeof data === 'string') {
        const parts = data.split('/');
        const id = parts[parts.length - 1];
        if(id) {
            return parseInt(id);
        }
    } else if(Object.keys(data).includes('id')) {
        return data.id;
    }
    return null;
}
