import { renameFile } from "functions/files/fileRenamer";
import { resolveUniqueName } from "functions/files/uniqueNameResolver";

describe('resolveUniqueName', () => {
    it('should get same name when name dont exist', () => {
        expect(
            resolveUniqueName('file.jpg', ['other_name.jpg'], renameFile)
        ).toEqual('file.jpg');
    })

    it('should rename when name already exist', () => {
        expect(
            resolveUniqueName('file.jpg', ['file.jpg'], renameFile)
        ).toEqual('file(1).jpg');
    })

    it('should rename until find original name', () => {
        expect(
            resolveUniqueName('file.jpg', ['file.jpg', 'file(1).jpg', 'file(2).jpg'], renameFile)
        ).toEqual('file(3).jpg');
    })
})

