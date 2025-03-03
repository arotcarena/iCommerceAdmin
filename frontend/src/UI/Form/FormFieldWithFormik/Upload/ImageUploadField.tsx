import { ImageUploader } from "UI/Upload/ImageUploader";
import { PropsWithChildren, useEffect, useState } from "react";
import { FormFeedback, Label } from "reactstrap";
import { UploadedFile } from "type/formTypes";
import { convertEntityAttachmentsToUploadedFiles, convertUploadedFilesToEntityAttachments } from "functions/files/uploadedFileConvertor";

type Props = PropsWithChildren<{
    multiple?: boolean,
    acceptedFormats?: string[],
    minSize?: number,
    maxSize?: number,
    maxCount?: number,
    required?: boolean,
    validation: any,
    name: string,
    onChange?: (uploadedFiles: UploadedFile[]) => void,
    margin?: number,
    small?: boolean,
    [key: string]: any
}>;

export const ImageUploadField = ({
    multiple = false,
    acceptedFormats = [],
    minSize,
    maxSize,
    maxCount,
    required = false,
    validation,
    name,
    onChange,
    margin,
    children,
    small = false,
    ...props
}: Props) => {
    //intern state
    const [currentFiles, setCurrentFiles] = useState<UploadedFile[]>(convertEntityAttachmentsToUploadedFiles(validation.values[name]));
    
    //SYNCHRONIZATION
    //from currentFiles (in state) to validation (out state)
    useEffect(() => {
        validation.setFieldValue(name, convertUploadedFilesToEntityAttachments(currentFiles));
    //eslint-disable-next-line
    }, [currentFiles]);
    //from validation (out) to currentFiles (in)
    useEffect(() => {
        const filesFromOut = convertEntityAttachmentsToUploadedFiles(validation.values[name]);
        //verify if different to avoid infinite loops
        if(JSON.stringify(filesFromOut) != JSON.stringify(currentFiles)) {
            setCurrentFiles(filesFromOut);
        }
    }, [validation.values[name]]);
    
    const handleChange = (uploadedFiles: UploadedFile[]) => {
        if(onChange) {
            onChange(uploadedFiles);
        }
        setCurrentFiles(uploadedFiles);
    };

    const handleError = (error: string) => {
        validation.touched[name] = true;
        validation.setFieldError(name, error);
    };
 

    return (
        <div className={(margin ? 'mt-'+margin+' mb-'+margin: '') + (small ? ' upload-field-small': '') + (props.disabled ? ' disabled': '')}>
            {
                children && <Label>{children}</Label>
            }
            <ImageUploader
                multiple={multiple}
                value={currentFiles}
                onChange={handleChange}
                onError={handleError}
                acceptedFormats={acceptedFormats}
                minSize={minSize}
                maxSize={maxSize}
                maxCount={maxCount}
                errors={
                    (validation.touched[name] && validation.errors[name]) ? (
                        <FormFeedback 
                            dangerouslySetInnerHTML={{__html: validation.errors[name]}} 
                            type="invalid"
                        />
                    ) : null
                }
                {...props}
            />
        </div>
    )
}