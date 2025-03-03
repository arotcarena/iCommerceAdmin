import { resolveUniqueString } from "functions/stringHelpers/uniqueStringResolver"

describe('resolveUniqueString', () => {
    it('should return same value if not existing', () => {
        let result = resolveUniqueString('test', ['hello', 'bonjour']);
        expect(result).toEqual('test');

        result = resolveUniqueString('test', ['hello', 'test (1)', 'bonjour']);
        expect(result).toEqual('test');

        result = resolveUniqueString('test', ['hello', 'test', 'test (2)', 'bonjour']);
        expect(result).toEqual('test (1)');
    })

    it('should return unique value if existing', () => {
        let result = resolveUniqueString('test', ['hello', 'test', 'bonjour']);
        expect(result).toEqual('test (1)');

        result = resolveUniqueString('test', ['hello', 'test', 'bonjour', 'test (1)']);
        expect(result).toEqual('test (2)');

        result = resolveUniqueString('test', ['hello', 'test', 'bonjour', 'test (1)', 'test (2)']);
        expect(result).toEqual('test (3)');
    })
})
