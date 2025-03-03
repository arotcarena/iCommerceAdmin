
describe('generateUrl', () => {

    jest.mock('../../../Routes/routes', () => ({
        publicRoutes: [
            { name: 'test', path: '/test', title: 'test' },
            { name: 'test_with_params_in_path', path: '/test/:id', title: 'test' },
            { name: 'test_with_params_in_query', path: '/test/query', title: 'test' }
        ],
        authRoutes: []
    }));

    const {generateUrl} = require('functions/router/urlGenerator');
    
    afterAll(() => {
        jest.resetModules();
    });

    it('should generate correct url without params', () => {
        expect(
            generateUrl('test')
        ).toEqual('/test');
    })

    it('should generate correct url with params in path', () => {
        expect(
            generateUrl('test_with_params_in_path', {id: 3})
        ).toEqual('/test/3');
    })

    it('should generate correct url with params in query', () => {
        expect(
            generateUrl('test_with_params_in_query', {name: 'Jean', age: 10})
        ).toEqual('/test/query?name=Jean&age=10');
    })

    it('should generate correct url with no params in path when url has params in path but we dont pass these params', () => {
        expect(
            generateUrl('test_with_params_in_path')
        ).toEqual('/test');
    })

    it('should generate correct url with no params in path when url has params in path but we pass other params', () => {
        expect(
            generateUrl('test_with_params_in_path', {otherParam: 'Georges', testParam: 5})
        ).toEqual('/test?otherParam=Georges&testParam=5');
    })
})