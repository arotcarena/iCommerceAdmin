import { PropsWithChildren, useEffect } from "react"
import { FormFeedback, Label } from "reactstrap"
import Select from "react-select"
import { convertChoicesToOptions } from "functions/api/convertor/choicesToOptionsConvertor"
import { InputIconsDisabled } from "../WithSuggest/InputIcons"
import { SelectedItemDisabled } from "../WithSuggest/SelectedItem"
import { ChoicesType, SelectOption } from "type/formTypes"
import { SelectDisabled } from "../FormFieldParts/SelectDisabled"

type Props = PropsWithChildren<{
    name: string,
    validation: any,
    onBlur?: () => void,
    onChange?: (options: SelectOption[]) => void,
    choices: ChoicesType,
    margin?: number,
    disabled?: boolean,
    [key: string]: any
}>

export const SelectMultiField = ({
    name,
    validation,
    onBlur,
    onChange,
    choices,
    children,
    margin,
    disabled = false,
    ...props
}: Props) => {

    const handleBlur = (e: any) => {
        if(onBlur) {
            onBlur();
        }
        validation.handleBlur(e);
    };

    const handleChange = (options: SelectOption[]) => {
        if(onChange) {
            onChange(options);
        }
        validation.setFieldValue(name, options.map(option => option.value));
    };

    const options = convertChoicesToOptions(choices);

    
    if(disabled) {
        return (
            <SelectDisabled
                multiple={true}
                margin={margin}
                name={name}
                value={validation.values[name]}
                options={options}
            >
                {children}
            </SelectDisabled>
        )
    }

    return (
        <div className={'select-zindex-group' + (margin ? ' mt-'+margin+' mb-'+margin: '')} style={{zIndex: 1}}>
            {
                children && (
                    <Label htmlFor={name} className="form-label">{children}</Label>
                )
            }
            <Select
                name={name}
                className={(validation.errors[name]) ? 'is-invalid' : ''}
                isMulti={true}
                value={options.filter(option => validation.values[name]?.includes(option.value))}
                options={options}
                onChange={handleChange}
                onBlur={handleBlur}
                {...props}
            />
            {
                validation.errors[name] ? (
                    <FormFeedback type="invalid">{validation.errors[name]}</FormFeedback>
                ) : null
            }
        </div>
    )
}
