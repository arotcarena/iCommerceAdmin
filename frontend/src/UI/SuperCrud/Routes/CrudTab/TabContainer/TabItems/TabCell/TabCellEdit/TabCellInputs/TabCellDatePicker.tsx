
import { useTranslation } from "react-i18next";
import { DatePickerField } from "UI/Form/FormFieldWithFormik/DatePickerField";
import { ModalField } from "UI/Form/FormFieldWithFormik/SubForm/ModalField";

type Props = {
    validation: any,
    field: string,
    closeEdit: () => void,
    onSubmit: () => void,
    enableTime?: boolean
};

export const TabCellDatePicker = ({
    validation,
    field,
    closeEdit,
    onSubmit,
    enableTime = false
}: Props) => {
    const {t} = useTranslation();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        onSubmit();
    };

    return (
        <ModalField
            close={closeEdit}
            onSubmit={handleSubmit}
            formField={(
                <div className="mb-4" style={{padding: '0 30px'}}>
                    <DatePickerField
                        validation={validation}
                        name="value"
                        autoFocus={true}
                        enableTime={enableTime}
                        value={validation.values.value}
                        isAlwaysOpen={true}
                    >
                        {t(field)}
                    </DatePickerField>
                </div>
            )}
        />
    )
}
