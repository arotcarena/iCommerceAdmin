import { createExcerpt } from "functions/stringHelpers/excerptMaker";

describe('createExcerpt', () => {
    it('should return same string if shorter as count param', () => {
        expect(
            createExcerpt('test', 10)
        ).toEqual('test')
    });

    it('should return correct excerpt count', () => {
        expect(
            createExcerpt('very long text for test excerpt maker function', 10).length
        ).toEqual(10 + 2 + 2 + 3)// + 2 spaces + 2 'xt' to go to next space + 3 '...' 
    });

    it('should return correct excerpt cut at first space after 10 characters', () => {
        expect(
            createExcerpt('very long text for test excerpt maker function', 10)
        ).toEqual('very long text...')
    });
})
