import { getFileExtension } from "functions/files/extensionResolver"

describe('getFileExtension', () => {
    it('should get correct extension', () => {
        const extension = getFileExtension('my-file-4.jpg');
        expect(extension).toEqual('jpg');

        const extension2 = getFileExtension('my-file-4.png.pdf');
        expect(extension2).toEqual('pdf');
    })
})