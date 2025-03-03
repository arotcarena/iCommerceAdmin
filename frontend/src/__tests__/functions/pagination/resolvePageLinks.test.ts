import { resolvePageLinks } from "functions/pagination/resolvePageLinks"

describe('resolvePageLinks', () => {
    it('should return correct page link numbers when current page = 1', () => {
        const links = resolvePageLinks(1, 3, 10);
        expect(JSON.stringify(links)).toEqual(JSON.stringify([1, 2, 3, 4, 5, 6, 10]));
    })

    it('should return correct page link numbers when current page = max page', () => {
        const links = resolvePageLinks(10, 3, 10);
        expect(JSON.stringify(links)).toEqual(JSON.stringify([1, 5, 6, 7, 8, 9, 10]));
    })

    it('should return correct page link numbers when have not enough pages', () => {
        const links = resolvePageLinks(1, 3, 2);
        expect(JSON.stringify(links)).toEqual(JSON.stringify([1, 2]));

        const links2 = resolvePageLinks(10, 3, 2);
        expect(JSON.stringify(links2)).toEqual(JSON.stringify([1, 2]));
    })

    it('should return correct page link numbers when have enough pages', () => {
        const links = resolvePageLinks(50, 5, 100);
        expect(JSON.stringify(links)).toEqual(JSON.stringify([1, 46, 47, 48, 49, 50, 51, 52, 53, 54, 100]));
    })
})