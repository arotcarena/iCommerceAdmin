import { CountryField } from "UI/Form/FormFieldWithFormik/CountryField";

type Props = {
    validation: any,
    closeEdit: () => void,
    onSubmit: () => void,
    multiple: boolean
};

export const TabCellCountryField = ({
    validation,
    closeEdit,
    onSubmit,
    multiple
}: Props) => {
    const handleBlur = async (): Promise<void> => {
        await onSubmit();
        closeEdit();
    };
    const handleChange = () => {
        onSubmit();
    };
    
    const handleKeyDown = (e: any): void => {
        if(e.key === 'Enter') {
            onSubmit();
        }
    };


    if(multiple) {
        return (
            <div className="large-select-wrapper">
                <CountryField
                    name="value"
                    validation={validation}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    autoFocus={true}
                />
            </div>
        )
    }

    return (
        <div className="large-select-wrapper">
            <CountryField
                name="value"
                validation={validation}
                onChange={handleChange}
                onBlur={handleBlur}
                autoFocus={true}
            />
        </div>
    )
}