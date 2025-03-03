import { getItemsPerPage, getPageNumber } from "functions/api/convertor/apiPlatformConversion/hydra/iriDataExtractor";

describe('getPageNumber', () => {
    it('should return correct page number when present at end of IRI', () => {
        const page = getPageNumber('/api/users?itemsPerPage=10&locale=en&page=4');
        expect(page).toEqual(4);
    })

    it('should return correct page number when present at middle of IRI', () => {
        const page = getPageNumber('/api/users?itemsPerPage=10&page=6&locale=en');
        expect(page).toEqual(6);
    })

    it('should return default page number when not present in IRI', () => {
        const page = getPageNumber('/api/users?itemsPerPage=10&locale=en');
        expect(page).toEqual(1);
    })
});

describe('getItemsPerPage', () => {
    it('should return correct itemsPerPage value when present at start of IRI', () => {
        const page = getItemsPerPage('/api/users?itemsPerPage=10&locale=en&page=4');
        expect(page).toEqual(10);
    })

    it('should return correct itemsPerPage value when present at middle of IRI', () => {
        const page = getItemsPerPage('/api/users?locale=en&itemsPerPage=20&page=6');
        expect(page).toEqual(20);
    })

    it('should return default itemsPerPage value when not present in IRI', () => {
        const page = getItemsPerPage('/api/users?page=4&locale=en');
        expect(page).toEqual(10);
    })
})
