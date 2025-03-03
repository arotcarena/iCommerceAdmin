import { PropsWithChildren } from "react";
import { Input, Label } from "reactstrap";

export type CheckboxFieldProps = PropsWithChildren<{
    name: string,
    validation: any,
    onBlur?: (e: any) => void,
    onChange?: (e: any) => void,
}>;

export const CheckboxField = ({
    name,
    validation,
    onBlur,
    onChange,
    children
}: CheckboxFieldProps) => {

    const handleBlur = (e: any) => {
        if(onBlur) {
            onBlur(e);
        }
        validation.handleBlur(e);
    };

    const handleChange = (e: any) => {
        if(onChange) {
            onChange(e);
        }
        validation.handleChange(e);
    }

    return (
        <div className="form-check">
            <Input 
                className="form-check-input" 
                name={name} 
                type="checkbox" 
                value={validation.values[name] || false}
                onChange={handleChange}
                onBlur={handleBlur}
                id={name}
                invalid={
                    validation.touched[name] && validation.errors[name] ? true : false
                }
            />
            <Label className="form-check-label" htmlFor={name}>{children}</Label>
            {
                validation.touched[name] && validation.errors[name] && (
                    <div className="invalid-feedback">{validation.errors[name]}</div>
                )
            }
        </div>
    )
}
