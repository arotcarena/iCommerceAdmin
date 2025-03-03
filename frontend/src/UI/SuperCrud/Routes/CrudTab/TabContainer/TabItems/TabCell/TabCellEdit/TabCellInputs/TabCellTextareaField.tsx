import { ModalField } from "UI/Form/FormFieldWithFormik/SubForm/ModalField";
import { TextareaField } from "UI/Form/FormFieldWithFormik/TextareaField";
import { FormEvent } from "react";
import { useTranslation } from "react-i18next";

type Props = {
    validation: any,
    type: string,
    closeEdit: () => void,
    onSubmit: () => void,
    field: string
};

export const TabCellTextareaField = ({
    validation,
    type,
    closeEdit,
    onSubmit,
    field
}: Props) => {
    const {t} = useTranslation();

    const handleSubmit = (e: FormEvent): void => {
        e.preventDefault();
        onSubmit();
    };

    return (
        <ModalField
            close={closeEdit}
            onSubmit={handleSubmit}
            formField={(
                <div className="mb-4">
                    <TextareaField
                        autoFocus={true}
                        type={type} 
                        name="value"
                        validation={validation}
                        rows={5}
                    >
                        {t(field)}
                    </TextareaField>
                </div>
            )}
        />
    )
}