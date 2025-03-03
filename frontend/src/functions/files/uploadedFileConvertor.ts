import { UploadedFile } from "type/formTypes";
import { EntityAttachment } from "type/entityTypes";

/**
 * Accept path or path[]
 * @param paths 
 * @returns 
 */
export const convertEntityAttachmentsToUploadedFiles = (
    entityAttachments?: EntityAttachment[]|EntityAttachment
): UploadedFile[] => {
    if(!entityAttachments || entityAttachments.length === 0) {
        return [];
    }   
    if(Array.isArray(entityAttachments)) {
        return entityAttachments.map(entityAttachment => ({
            id: entityAttachment.id,
            name: entityAttachment.fileName,
            src: entityAttachment.filePath,
        }));
    }
    return [{
            id: entityAttachments.id,
            name: entityAttachments.fileName,
            src: entityAttachments.filePath,
    }];
};

/**
 * 
 * @param uploadedFileList 
 * @returns path or path[]
 */
export const convertUploadedFilesToEntityAttachments = (uploadedFileList: UploadedFile[]): EntityAttachment[]|EntityAttachment => {
    const entityAttachments: EntityAttachment[] = uploadedFileList.map(uploadedFile => ({
        id: uploadedFile.id,
        fileName: uploadedFile.name,
        filePath: uploadedFile.src, 
    }));

    if(entityAttachments.length > 1) {
        return entityAttachments;
    }
    return entityAttachments[0];
};