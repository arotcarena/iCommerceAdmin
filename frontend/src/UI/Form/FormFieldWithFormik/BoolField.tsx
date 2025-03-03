import { PropsWithChildren } from "react";
import { Input, Label } from "reactstrap"

type Props = PropsWithChildren<{
    validation: any,
    name: string,
    margin?: number,
    size?: 'md'|'lg',
    onChange?: () => void,
    [key: string]: any
}>;

export const BoolField = ({
    validation,
    name,
    margin,
    children,
    size,
    onChange,
    ...props
}: Props) => {

    const handleChange = (e: any) => {
        validation.setFieldValue(name, e.target.checked);
        if(onChange) {
            onChange();
        }
    };

    return (
        <div className={'form-check form-switch' + (margin ? ' mt-'+margin+' mb-'+margin: '') + (validation.values[name] === true ? ' checked': '') + (props.disabled ? ' disabled': '')}>
            {
                children && <Label htmlFor={name}>{children}</Label>
            }
            <Input
                name={name}
                disabled={props.disabled}
                onBlur={validation.handleBlur} 
                onChange={handleChange}
                checked={validation.values[name] ? true: false} 
                type="checkbox" 
                role="switch" id="flexSwitchCheckDefault"
                className={'form-check-input' + (size ? ' form-switch-' +size: '')} 
                invalid={
                    validation.touched[name] && validation.errors[name] ? true : false
                }
                {...props}
            />
            {
                validation.touched[name] && validation.errors[name] && (
                    <div className="invalid-feedback">{validation.errors[name]}</div>
                )
            }
        </div>
    )
}

