import { SelectField } from "UI/Form/FormFieldWithFormik/SelectField";
import { SelectMultiField } from "UI/Form/FormFieldWithFormik/SelectMultiField";
import { ChoicesType } from "type/formTypes";

type Props = {
    validation: any,
    choices: ChoicesType,
    multiple: boolean,
    closeEdit: () => void,
    onSubmit: () => void,
    [key: string]: any,
};

export const TabCellSelect = ({
    validation,
    choices,
    multiple = false,
    closeEdit, 
    onSubmit,
    ...props
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
                <SelectMultiField
                    name="value"
                    validation={validation}
                    choices={choices}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    autoFocus={true}
                    {...props}
                />
            </div>
        )
    }

    return (
        <div className="large-select-wrapper">
            <SelectField
                name="value"
                validation={validation}
                choices={choices}
                onChange={handleChange}
                onBlur={handleBlur}
                autoFocus={true}
                {...props}
            />
        </div>
    )
}
