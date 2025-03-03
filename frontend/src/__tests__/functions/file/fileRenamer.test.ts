import { getFileExtension } from "functions/files/extensionResolver";
import { renameFile } from "functions/files/fileRenamer"

describe('renameFile', () => {
    it('should keep correct extension', () => {
        const renamedFile = renameFile('file.png');
        expect(getFileExtension(renamedFile)).toEqual('png');
    })

    it('should keep original fileName', () => {
        const renamedFile = renameFile('file.png');
        expect(renamedFile).toContain('file');

        const renamedFile2 = renameFile('file-5.png');
        expect(renamedFile2).toContain('file-5');
    })

    it('should add (1) to fileName when having no number', () => {
        const renamedFile = renameFile('file.jpg');
        expect(renamedFile).toEqual('file(1).jpg');

        const renamedFile2 = renameFile('file-5.jpg');
        expect(renamedFile2).toEqual('file-5(1).jpg');
    })

    it('should add following number to fileName when already having a number', () => {
        const renamedFile = renameFile('file(3).jpg');
        expect(renamedFile).toEqual('file(4).jpg');
    })
})