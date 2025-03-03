import React, { ReactNode } from 'react';
import Dropzone, { FileRejection } from "react-dropzone";
import { convertFileToBase64 } from "functions/files/base64Convertor";
import { ImageCard } from './ImageCard';
import { File, UploadedFile } from 'type/formTypes';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';
import { useDeleteEntityAttachments, usePostEntityAttachments } from 'functions/customHooks/api/queries/entityAttachmentsQueries';

type Props = {
    multiple?: boolean,
    value?: UploadedFile[],
    onChange: (uploadedFiles: UploadedFile[]) => void,
    onError?: (error: string) => void,
    acceptedFormats?: string[],
    minSize?: number,
    maxSize?: number,
    maxCount?: number,
    errors?: ReactNode,
    type?: string,
    [key: string]: any
};

export const prepareErrorMessage = (
    fileRejections: FileRejection[], 
    acceptedFormats?: string[], 
    minSize?: number, 
    maxSize?: number
): string => {
    let messageParts: string[] = [];
    for(const {errors: fileErrors, file} of fileRejections) {
        let fileMessageParts: string[] = [];
        for(const {code, message} of fileErrors) {
            if(code === 'file-too-small' && minSize) {
                fileMessageParts.push(t('assert.minSize', {minSize: minSize + 'o'}));
            } else if(code === 'file-too-large' && maxSize) {
                fileMessageParts.push(t('assert.maxSize', {maxSize: maxSize + 'o'}))
            } else if(code === 'file-invalid-type' && acceptedFormats) {
                fileMessageParts.push(t('assert.acceptedFormats', {acceptedFormats: acceptedFormats.join(',')}));
            } else {
                fileMessageParts.push(message);
            }
        }
        messageParts.push(file.name + ' : ' + fileMessageParts.join(', '))
    }

    if(messageParts.length === 0) {
        return t('error.unknown');
    }
    return messageParts.join('<br/>');
}


export const ImageUploader = ({
    multiple = false,
    value = [],
    onChange,
    onError,
    acceptedFormats = ['image/jpg', 'image/jpeg', 'image/png'],
    minSize,
    maxSize,
    maxCount,
    errors,
    type,
    ...props
}: Props) => {
    const {t} = useTranslation();
    
    const postEntityAttachments = usePostEntityAttachments(type);
    const deleteEntityAttachments = useDeleteEntityAttachments();

    const handleAcceptedFiles = (acceptedFiles: any[], fileRejections: FileRejection[]) => {
        //Validation
        //maxSize, minSize, acceptedFormat
        if(fileRejections.length > 0) {
            if(onError) {
                const errorMessage = prepareErrorMessage(fileRejections, acceptedFormats, minSize, maxSize)
                onError(errorMessage);
            }
            return;
        }
        addFiles(acceptedFiles);
    };

    const addFiles = async (files: File[]) => {
        let addingFiles: UploadedFile[] = [];
        for(const file of files) {
            const convertedFile = await convertFileToBase64(file);

            //send base64 and receive entityAttachment
            const entityAttachment = await postEntityAttachments(convertedFile.src, convertedFile.name);

            addingFiles.push({
                id: entityAttachment.id,
                name: entityAttachment.fileName,
                src: entityAttachment.filePath,
                size: convertedFile.size,
            });
        }

        const newFiles = multiple ? [...value, ...addingFiles]: addingFiles;
        
        //validation
        //maxCount
        if(maxCount && newFiles.length > maxCount) {
            if(onError) {
                onError(t('assert.maxCount', {maxCount}));
            }
            return;
        }

        onChange(newFiles);
    };

    const handleRemove = async (uploadedFile: UploadedFile) => {
        try {
            if(uploadedFile.id) {
                await deleteEntityAttachments(uploadedFile.id);
            }
            onChange(value.filter(uf => uf.name !== uploadedFile.name));
        } catch(e) {
            if(onError) {
                onError(t('error.file_removal'));
            }
        }
    };

    let accept = {};
    for(const acceptedFormat of acceptedFormats) {
        accept = {
            ...accept,
            [acceptedFormat]: []
        }
    }


    return (
        <>
            <Dropzone
                multiple={multiple}
                accept={accept}
                minSize={minSize}
                maxSize={maxSize}
                onDrop={handleAcceptedFiles}
                {...props}
            >
                {
                    ({ getRootProps, getInputProps }) => (
                        <div className="dropzone dz-clickable">
                            <div
                                className="dz-message needsclick"
                                {...getRootProps()}
                            >
                                <div className="mb-3">
                                    <i className="display-4 text-muted ri-upload-cloud-2-fill" />
                                </div>
                                <h4 className="ps-2 pe-2">{t('drop_files')}</h4>
                            </div>
                        </div>
                    )
                }
            </Dropzone>
            <div className="ms-1 me-1 mt-2 mb-2">
                <div className="is-invalid"></div>
                {
                    errors && errors
                }
            </div>
            <div className="list-unstyled mb-0" id="file-previews">
                {
                    value.map((uploadedFile, index) => (
                        <ImageCard
                            key={index}
                            uploadedFile={uploadedFile}
                            onRemove={handleRemove}
                            disabled={props.disabled}
                        />
                    ))
                }
            </div>
        </>
    )
}