import { getFutureSortDir } from "functions/sortHelper"

describe('getFutureSortDir', () => {
    it('should return ASC when no sortBy is defined', () => {
        expect(getFutureSortDir(undefined, 'field')).toEqual('ASC');
    })
    it('should return ASC when no direction is defined for this field', () => {
        expect(getFutureSortDir('price_ASC', 'email')).toEqual('ASC');
    })
    it('should return correct opposite direction when a direction is already defined for this field', () => {
        expect(getFutureSortDir('price_ASC', 'price')).toEqual('DESC');
        expect(getFutureSortDir('price_DESC', 'price')).toEqual('ASC');
    })
})
