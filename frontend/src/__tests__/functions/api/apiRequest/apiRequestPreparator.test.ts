import { prepareApiRequest } from "functions/api/apiRequest/apiRequestPreparator"
import { destroyAuthToken, storeAuthToken } from "functions/storage/auth/authTokenStorage";
import i18n from "i18n";

describe('prepareApiRequest', () => {

    beforeEach(() => destroyAuthToken());

    it('should set correct Accept headers', () => {
        const {customHeaders} = prepareApiRequest('GET');
        expect(customHeaders["Content-Type"]).toEqual('application/ld+json');
    })

    it('should set ld+json Content-Type when method is POST or PUT', () => {
        const {customHeaders} = prepareApiRequest('POST');
        expect(customHeaders["Content-Type"]).toEqual('application/ld+json');
        
        const {customHeaders: customHeaders2} = prepareApiRequest('PUT');
        expect(customHeaders2["Content-Type"]).toEqual('application/ld+json');
    })

    it('should set merge-patch+json Content-Type when method is PATCH', () => {
        const {customHeaders} = prepareApiRequest('PATCH');
        expect(customHeaders["Content-Type"]).toEqual('application/merge-patch+json');
    })

    it('should add correct Authorization header when token is present', () => {
        storeAuthToken('auth_token');
        const {customHeaders} = prepareApiRequest('GET');
        expect(customHeaders['Authorization']).toEqual('Bearer auth_token')
    })

    it('should not add auth token when token isn\'t present', () => {
        const {customHeaders} = prepareApiRequest('GET');
        expect(customHeaders['Authorization']).toBeUndefined();
    })

    it('should add locale param on urlParams when method is GET', () => {
        i18n.language = 'en';
        const {urlParams} = prepareApiRequest('GET');
        expect(Object.keys(urlParams).includes('locale')).toBeTruthy();
        expect(Object.values(urlParams).includes('en')).toBeTruthy();
    })

    it('should add locale param on urlParams when method is POST', () => {
        i18n.language = 'en';
        const {urlParams} = prepareApiRequest('POST');
        expect(Object.keys(urlParams).includes('locale')).toBeTruthy();
        expect(Object.values(urlParams).includes('en')).toBeTruthy();
    })
})