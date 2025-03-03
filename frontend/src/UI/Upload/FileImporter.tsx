import React, { ReactNode, useState } from 'react';
import Dropzone, { FileRejection } from "react-dropzone";
import { convertFileToBase64 } from "functions/files/base64Convertor";
import { File } from 'type/formTypes';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';
import { usePostEntityAttachments } from 'functions/customHooks/api/queries/entityAttachmentsQueries';
import { Button } from 'reactstrap';
import { useOpenState } from 'functions/customHooks/state/useOpenState';

type Props = {
    multiple?: boolean,
    onError?: (error: string) => void,
    onSuccess?: (countImportedFiles: number) => void,
    acceptedFormats?: string[],
    minSize?: number,
    maxSize?: number,
    maxCount?: number,
    entityId?: number,
    type?: string,
    title?: string,
    className?: string,
    button?: ReactNode,
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


export const FileImporter = ({
    multiple = false,
    onError,
    onSuccess,
    acceptedFormats = ['text/plain', 'application/msword', 'text/csv', 'application/pdf'],
    minSize,
    maxSize,
    maxCount,
    entityId,
    type,
    title,
    className,
    button,
    ...props
}: Props) => {
    const {t} = useTranslation();
    
    const postEntityAttachments = usePostEntityAttachments(type);

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
        if(maxCount && files.length > maxCount) {
            if(onError) {
                onError(t('assert.maxCount', {maxCount}))
            }
        }
        let count = 0;
        for(const file of files) {
            //convert to UploadedFile having base64 as src
            const convertedFile = await convertFileToBase64(file);

            //send base64 and receive filePath
            await postEntityAttachments(convertedFile.src, convertedFile.name, entityId);
            count++;
        }
        if(onSuccess) {
            onSuccess(count);
        }
        
        dragLeave();
    };

    const [isDragging, dragEnter, dragLeave] = useOpenState(false);

    let accept = {};
    for(const acceptedFormat of acceptedFormats) {
        accept = {
            ...accept,
            [acceptedFormat]: []
        }
    }

    return (
        <Dropzone
            multiple={multiple}
            accept={accept}
            minSize={minSize}
            maxSize={maxSize}
            onDrop={handleAcceptedFiles}
            onDragEnter={dragEnter}
            onDragLeave={dragLeave}
            {...props}
        >
            {
                ({ getRootProps, getInputProps }) => (
                    <div
                        className="dz-message needsclick"
                        {...getRootProps()}
                    >
                        {
                            button ?? (
                                <Button className={'import-button ' + (className ?? 'btn') + (isDragging ? ' dragging': '')}>
                                    <i className="ri-file-upload-line align-bottom me-1"></i>{" "}
                                    {title ?? t('import')}
                                </Button>
                            )
                        }
                    </div>
                )
            }
        </Dropzone>
    )
}
