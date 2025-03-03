import { hasArrayAllValues, haveArraysCommonValue } from "functions/arrayHelpers/commonValuesChecker"

describe('haveArraysCommonValue', () => {
    it('should return true when arrays have a common value', () => {
        const result = haveArraysCommonValue(
            ['eagle', 'cat', 'dog'],
            ['elephant', 'lion', 'bird', 'cat', 'bull']
        );
        expect(result).toBeTruthy();
    })

    it('should return true if arrays have several common values', () => {
        const result = haveArraysCommonValue(
            ['eagle', 'cat', 'dog'],
            ['elephant', 'lion', 'dog', 'bird', 'cat', 'bull']
        );
        expect(result).toBeTruthy();
    })

    it('should return false when arrays have no common value', () => {
        const result = haveArraysCommonValue(
            ['eagle', 'cat', 'dog'],
            ['elephant', 'lion', 'bird', 'bull']
        );
        expect(result).toBeFalsy();
    })
})

describe('hasArrayAllValues', () => {
    it('should return true when array have all values', () => {
        let result = hasArrayAllValues(
            ['eagle', 'cat', 'elephant', 'dog'],
            ['eagle', 'elephant']
        );
        expect(result).toBeTruthy();

        result = hasArrayAllValues(
            ['eagle', 'cat', 'elephant', 'dog'],
            []
        );
        expect(result).toBeTruthy();

        result = hasArrayAllValues(
            ['eagle'],
            ['eagle']
        );
        expect(result).toBeTruthy();
    })

    it('should return false when array has no values', () => {
        let result = hasArrayAllValues(
            ['eagle', 'cat', 'dog'],
            ['eagle', 'dog', 'bird', 'bull']
        );
        expect(result).toBeFalsy();

        result = hasArrayAllValues(
            [],
            ['eagle', 'dog', 'bird', 'bull']
        );
        expect(result).toBeFalsy();

        result = hasArrayAllValues(
            ['dog', 'bird', 'bull'],
            ['eagle', 'dog']
        );
        expect(result).toBeFalsy();
    })
})
