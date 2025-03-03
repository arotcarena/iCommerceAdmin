export const removeHydraKeysOnSingleItem = (item: {[key: string]: any}) => {
    if(item['@context']) {
        delete item['@context'];
    }
    if(item['@id']) {
        delete item['@id'];
    }
    if(item['@type']) {
        delete item['@type'];
    }
}