import { useSuperCrud } from "Components/Contexts/SuperCrudContext";
import { NumberField } from "UI/Form/FormFieldWithFormik/NumberField";
import { PasswordField } from "UI/Form/FormFieldWithFormik/PasswordField";
import { TextField } from "UI/Form/FormFieldWithFormik/TextField";
import { KeyboardEvent } from "react";
import { TabColumnType, ValidationConstraints } from "type/superCrudTypes";

type Props = {
    validation: any,
    type: TabColumnType,
    closeEdit: () => void,
    onSubmit: () => void,
    constraints?: ValidationConstraints
};

export const TabCellTextField = ({
    validation,
    type,
    closeEdit,
    onSubmit,
    constraints
}: Props) => {
    const {isAlwaysCellEditing} = useSuperCrud();

    const handleBlur = async (e: any): Promise<void> => {
        if(validation.errors.value) {
            return;
        }
        //if click on show password button, don't close
        const relatedTarget = e.relatedTarget;
        if(relatedTarget && relatedTarget.classList.contains('btn-password-show')) {
            return;
        }
        await onSubmit();
        closeEdit();
    };

    const handleKeyDown = (e: KeyboardEvent): void => {
        if(e.key === 'Enter') {
            onSubmit();
        }
    };

    if(['int', 'float', 'decimal', 'price'].includes(type)) {
        return (
            <NumberField
                autoFocus={isAlwaysCellEditing ? false: true}
                type={type}
                onBlur={handleBlur} 
                onKeyDown={handleKeyDown} 
                name="value"
                validation={validation}
                maxDecimals={constraints?.maxDecimals}
            />
        )
    }

    if(type === 'password') {
        return (
            <PasswordField
                autoFocus={true}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                name="value"
                validation={validation}
            />
        )
    }

    return (
        <TextField
            autoFocus={true}
            type={type} 
            onBlur={handleBlur} 
            onKeyDown={handleKeyDown} 
            name="value"
            validation={validation}
        />
    )
}