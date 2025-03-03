import { PropsWithChildren } from "react";
import { EntitySuggestField } from "../FormField/EntitySuggestField";
import { EntityFieldValue } from "type/formTypes";
import { EntityType } from "type/entityTypes";

type Props = PropsWithChildren<{
    multiple?: boolean, 
    endpoint: string,
    defaultFilters?: {[key: string]: any},
    name: string,
    validation: any,
    labelProperty?: string,
    complementLabelProperty?: string,
    customEntityLabelResolver?: (entity: EntityType, locale?: string) => string,
    onSelect?: () => void,
    onClose?: () => void,
    placeholder?: string,
    margin?: number,
    defaultIsOpen?: boolean,
    openOnFocus?: boolean,
    disabled?: boolean,
    maxSuggestedItems?: number,
    onChange?: (value: any) => void,
    fullWidth?: boolean,
    [key: string]: any
}>;

export const EntitySuggestFieldWithFormik = ({
    validation,
    name,
    margin,
    onChange,
    fullWidth,
    ...props
}: Props) => {

    const handleChange = (value: EntityFieldValue) => {
        validation.setFieldValue(name, value);
        // Because no native change event is dispatch to validation, 
        // this is necessary to remove invalid status
        // use timeout because we need to wait that validation values have changed
        setTimeout(() => {
            if(validation.errors[name]) {
                validation.validateField(name);
            }
        }, 0);
        if(onChange) {
            onChange(value);
        }
    }

    return (
        <div 
            className={(margin ? 'mt-'+margin+' mb-'+margin: '') + ((validation.touched[name] && validation.errors[name]) ? ' select-group-is-invalid': '')}
            style={{width: fullWidth ? '100%': 'auto'}}
        >
            <EntitySuggestField
                name={name}
                value={validation.values[name]}
                onChange={handleChange}
                margin={0}
                onBlur={validation.handleBlur}
                isInvalid={validation.touched[name] && validation.errors[name]}
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
