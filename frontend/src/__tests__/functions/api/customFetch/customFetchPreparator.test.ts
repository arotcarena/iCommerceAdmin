import { prepareCustomFetch } from "functions/api/customFetch/customFetchPreparator";
import { destroyAuthToken } from "functions/storage/auth/authTokenStorage";

describe('prepareApiRequest', () => {

    beforeEach(() => {
        destroyAuthToken();
    });

    //headers
    it('should set correct Accept headers', () => {
        const {options} = prepareCustomFetch('endpoint', {}, 'GET');
        expect(options.headers["Accept"]).toEqual('application/json');
    })

    it('should set ld+json Content-Type when method is POST or PUT', () => {
        const {options} = prepareCustomFetch('endpoint', {}, 'POST');
        expect(options.headers["Content-Type"]).toEqual('application/json');
        
        const {options: options2} = prepareCustomFetch('endpoint', {}, 'PUT');
        expect(options2.headers["Content-Type"]).toEqual('application/json');
    })

    it('should set merge-patch+json Content-Type when method is PATCH', () => {
        const {options} = prepareCustomFetch('endpoint', {}, 'PATCH');
        expect(options.headers["Content-Type"]).toEqual('application/merge-patch+json');
    })

    //params
    it('should put params correctly in url when method is GET', () => {
        const {url} = prepareCustomFetch('/url', {firstName: 'Pierre', lastName: 'Lapin'}, 'GET');
        expect(url).toEqual('/url?firstName=Pierre&lastName=Lapin');
    })

    it('should add params correctly to url when method is GET and url contains already params', () => {
        const {url} = prepareCustomFetch('/url?age=4', {firstName: 'Pierre', lastName: 'Lapin'}, 'GET');
        expect(url).toEqual('/url?age=4&firstName=Pierre&lastName=Lapin');
    })

    it('should put params in body when method is not GET', () => {
        const params = {firstName: 'Pierre', lastName: 'Lapin'};
        const {url, options} = prepareCustomFetch('/url', params, 'POST');
        expect(url).toEqual('/url');
        expect(options.body).toEqual(JSON.stringify(params));

        const {options: options2} = prepareCustomFetch('/url', params, 'PUT');
        expect(options2.body).toEqual(JSON.stringify(params));
    })

    it('should customHeaders passed as param override headers', () => {
        const {url, options} = prepareCustomFetch('/url', {}, 'GET', {'Accept': 'text/html'});
        expect(options.headers['Accept']).toEqual('text/html');
    })
})