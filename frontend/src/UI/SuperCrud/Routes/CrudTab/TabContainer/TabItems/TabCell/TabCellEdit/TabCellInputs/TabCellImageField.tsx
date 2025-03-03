import { ModalField } from "UI/Form/FormFieldWithFormik/SubForm/ModalField";
import { ImageUploadField } from "UI/Form/FormFieldWithFormik/Upload/ImageUploadField";
import { FormEvent } from "react";
import { useTranslation } from "react-i18next";

type Props = {
    multiple?: boolean,
    acceptedFormats?: string[],
    minSize?: number,
    maxSize?: number,
    maxCount?: number,
    required?: boolean,
    validation: any,
    onSubmit: () => void,
    closeEdit: () => void,
    field: string,
    entityAttachmentType?: string
}

export const TabCellImageField = ({
    multiple = false,
    acceptedFormats = [],
    minSize,
    maxSize,
    maxCount,
    required,
    validation,
    onSubmit,
    closeEdit,
    field,
    entityAttachmentType
}: Props) => {
    const {t} = useTranslation();
    
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if(required && validation.values.value.length === 0) {
            validation.touched.value = true;
            validation.setFieldError('value', required);
            return;
        }
        onSubmit();
    }

    const handleKeyDown = (e: any): void => {
        if(e.key === 'Enter') {
            onSubmit();
        }
    };

    return (
        <ModalField
            close={closeEdit}
            onSubmit={handleSubmit}
            formField={(
                <div onKeyDown={handleKeyDown} className="mb-4">
                    <ImageUploadField
                        multiple={multiple}
                        acceptedFormats={acceptedFormats}
                        minSize={minSize}
                        maxSize={maxSize}
                        maxCount={maxCount}
                        required={required}
                        validation={validation}
                        name="value"
                        type={entityAttachmentType}
                    >
                        {t(field)}
                    </ImageUploadField>
                </div>
            )}
        />
        
    )
}
