import { HtmlTextField } from "UI/Form/FormFieldWithFormik/HtmlTextField";
import { ModalField } from "UI/Form/FormFieldWithFormik/SubForm/ModalField";
import { FormEvent } from "react";
import { useTranslation } from "react-i18next";

type Props = {
    validation: any,
    closeEdit: () => void,
    onSubmit: () => void,
    field: string,
    toolsConfig?: string
};

export const TabCellHtmlField = ({
    validation,
    closeEdit,
    onSubmit,
    field,
    toolsConfig
}: Props) => {
    const handleSubmit = (e: FormEvent): void => {
        e.preventDefault();
        onSubmit();
    };
    const {t} = useTranslation();
    
    return (
        <ModalField
            close={closeEdit}
            onSubmit={handleSubmit}
            formField={(
                <div className="mb-4">
                    <HtmlTextField
                        validation={validation}
                        name="value"
                        toolsConfig={toolsConfig}
                        hasLinkTool={false}
                    >
                        {t(field)}
                    </HtmlTextField>
                </div>
            )}
        />
    )
}