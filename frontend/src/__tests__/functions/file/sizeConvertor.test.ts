import { formatBytes } from "functions/files/sizeConvertor";

describe('formatBytes', () => {
    it('should get Correct Bytes format', () => {
        expect(
            formatBytes(10)
        ).toEqual('10 Bytes');
    })

    it('should get Correct KB format', () => {
        expect(
            formatBytes(100000)
        ).toEqual('97.66 KB');
    })

    it('should get Correct MB format', () => {
        expect(
            formatBytes(2000000)
        ).toEqual('1.91 MB');
    })
})
