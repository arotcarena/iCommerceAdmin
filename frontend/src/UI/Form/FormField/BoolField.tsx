import { PropsWithChildren } from "react";
import { Input, Label } from "reactstrap"

type Props = PropsWithChildren<{
    value: boolean,
    onChange: (value: boolean) => void,
    name: string,
    margin?: number,
    size?: 'md'|'lg',
    [key: string]: any
}>;

export const BoolField = ({
    value,
    onChange,
    name,
    margin,
    children,
    size,
    ...props
}: Props) => {

    const handleChange = (e: any) => {
        onChange(e.target.checked);
    };

    return (
        <div className={'form-check form-switch' + (margin ? ' mt-'+margin+' mb-'+margin: '') + (value === true ? ' checked': '')}>
            {
                children && <Label htmlFor={name}>{children}</Label>
            }
            <Input
                name={name}
                disabled={props.disabled}
                onChange={handleChange}
                checked={value}
                type="checkbox" 
                role="switch" id="flexSwitchCheckDefault"
                className={'form-check-input' + (size ? ' form-switch-' +size: '')} 
                {...props}
            />
        </div>
    )
}

