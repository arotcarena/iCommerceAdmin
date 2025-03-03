import { resolveEntityLabel } from "functions/entity/entityLabelResolver"

const item = {
    id: 1,
    firstName: 'Jean',
    age: 10,
    nationality: 'french'
}

describe('resolveEntityLabel', () => {
    it('should return empty string when passing no labelProperty and no complementLabelProperty', () => {
        expect(
            resolveEntityLabel(item)
        ).toEqual('');
    })
    it('should return correct label when passing labelProperty but no complementLabelProperty', () => {
        expect(
            resolveEntityLabel(item, 'firstName')
        ).toEqual('Jean');
    })
    it('should return correct label when passing labelProperty and complementLabelProperty', () => {
        expect(
            resolveEntityLabel(item, 'firstName', 'age')
        ).toEqual('Jean (10)');
    })
})
