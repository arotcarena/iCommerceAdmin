import { removeHydraKeysOnSingleItem } from "functions/api/convertor/apiPlatformConversion/hydra/hydraKeysRemover";

describe('removeHydraKeysOnSingleItem', () => {
    it('should remove @context', () => {
        const item = {
            ['@context']: 'context',
            key: 'value'
        };
        removeHydraKeysOnSingleItem(item);
        expect(item['@context']).toBeUndefined();
    })

    it('should remove @id', () => {
        const item = {
            ['@id']: 'context',
            key: 'value'
        };
        removeHydraKeysOnSingleItem(item);
        expect(item['@id']).toBeUndefined();
    })

    it('should remove @type', () => {
        const item = {
            ['@type']: 'context',
            key: 'value'
        };
        removeHydraKeysOnSingleItem(item);
        expect(item['@type']).toBeUndefined();
    })

    it('should keep other keys', () => {
        const item = {
            ['@context']: 'context',
            ['@id']: 'id',
            ['@type']: 'type',
            key: 'value'
        };
        removeHydraKeysOnSingleItem(item);
        expect(item.key).toEqual('value');
    })
})
