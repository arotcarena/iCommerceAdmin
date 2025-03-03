import { PropsWithChildren } from "react";
import { EntitySelectField } from "../FormField/EntitySelectField";
import { EntityFieldValue } from "type/formTypes";

type Props = PropsWithChildren<{
    multiple?: boolean, 
    endpoint: string,
    defaultFilters?: {[key: string]: any},
    name: string,
    validation: any,
    labelProperty?: string,
    complementLabelProperty?: string,
    customEntityLabelResolver?: (entity: {[key: string]: any}) => string,
    onSelect?: () => void,
    onClose?: () => void,
    placeholder?: string,
    margin?: number,
    defaultIsOpen?: boolean,
    disabled?: boolean,
    maxSuggestedItems?: number,
    onChange?: (value: any) => void,
    fullWidth?: boolean,
    [key: string]: any
}>;

export const EntitySelectFieldWithFormik = ({
    validation,
    name,
    margin,
    onChange,
    fullWidth,
    disabled = false,
    ...props
}: Props) => {
    const handleChange = (value: EntityFieldValue) => {
        validation.setFieldValue(name, value);
        if(onChange) {
            onChange(value);
        }
        if(props.onSelect) {
            props.onSelect();
        }
    }
    
    return (
        <div className={margin ? 'mt-'+margin+' mb-'+margin: ''} style={{width: fullWidth ? '100%': 'auto'}}>
            <EntitySelectField
                name={name}
                value={validation.values[name]}
                onChange={handleChange}
                margin={0}
                onBlur={validation.handleBlur}
                disabled={disabled}
                {...props}
            />
            {
                validation.touched[name] && validation.errors[name] && (
                    <>
                        <div className="is-invalid"></div>
                        <div className="invalid-feedback">{validation.errors[name]}</div>
                    </>
                )
            }
        </div>
    )
}
