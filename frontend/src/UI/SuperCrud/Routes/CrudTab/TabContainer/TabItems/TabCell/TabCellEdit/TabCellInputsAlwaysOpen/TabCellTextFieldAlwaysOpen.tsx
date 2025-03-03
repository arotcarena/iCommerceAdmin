import { NumberField } from "UI/Form/FormFieldWithFormik/NumberField";
import { TextField } from "UI/Form/FormFieldWithFormik/TextField";
import { KeyboardEvent, useEffect, useRef } from "react";
import { TabColumnType, ValidationConstraints } from "type/superCrudTypes";

type Props = {
    validation: any,
    type: TabColumnType,
    onSubmit: () => void,
    constraints?: ValidationConstraints,
    onFocus: () => void,
    editNextCell: () => void,
};

export const TabCellTextFieldAlwaysOpen = ({
    validation,
    type,
    onSubmit,
    constraints,
    onFocus,
    editNextCell,
}: Props) => {
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
    };

    const handleKeyDown = (e: KeyboardEvent): void => {
        if(e.key === 'Enter') {
            onSubmit();
            editNextCell();
        }
    };

    if(['int', 'float', 'decimal', 'price'].includes(type)) {
        return (
            <NumberField
                autoFocus={false}
                type={type}
                onBlur={handleBlur} 
                onKeyDown={handleKeyDown} 
                onFocus={onFocus}
                name="value"
                validation={validation}
                maxDecimals={constraints?.maxDecimals}
                ignoreZeroValue={true}
            />
        )
    }
    return (
        <TextField
            autoFocus={false}
            type={type} 
            onBlur={handleBlur} 
            onKeyDown={handleKeyDown} 
            onFocus={onFocus}
            name="value"
            validation={validation}
        />
    )
}
