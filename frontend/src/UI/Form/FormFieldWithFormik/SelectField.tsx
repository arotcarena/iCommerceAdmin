import { PropsWithChildren } from "react"
import { FormFeedback, Label } from "reactstrap"
import Select from "react-select"
import { convertChoicesToOptions } from "functions/api/convertor/choicesToOptionsConvertor"
import { InputIconsDisabled } from "../WithSuggest/InputIcons"
import { ChoicesType, SelectOption } from "type/formTypes"
import { SelectDisabled } from "../FormFieldParts/SelectDisabled"

type Props = PropsWithChildren<{
    name: string,
    validation: any,
    onBlur?: () => void,
    onChange?: (option: SelectOption) => void,
    choices: ChoicesType,
    margin?: number,
    disabled?: boolean,
    [key: string]: any
}>

export const SelectField = ({
    name,
    validation,
    onBlur,
    onChange,
    choices,
    children,
    margin,
    disabled,
    ...props
}: Props) => {

    const handleBlur = (e: any) => {
        if(onBlur) {
            onBlur();
        }
        validation.handleBlur(e);
    };

    const handleChange = (option: SelectOption) => {
        if(onChange) {
            onChange(option);
        }
        validation.setFieldValue(name, option.value);
    };
    
    const options = convertChoicesToOptions(choices);

    if(disabled) {
        return (
            <SelectDisabled
                multiple={false}
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
        <div 
            className={'select-zindex-group' + (margin ? ' mt-'+margin+' mb-'+margin: '') +
                ((validation.touched[name] && validation.errors[name]) ? ' select-group-is-invalid': '')}
        >
            {
                children && (
                    <Label htmlFor={name} className="form-label">{children}</Label>
                )
            }
            <Select
                name={name}
                value={options.find(option => option.value === validation.values[name])}
                options={options}
                onChange={handleChange}
                onBlur={handleBlur}
                classNamePrefix="select-field"
                {...props}
            />
            {
                validation.touched[name] && validation.errors[name] ? (
                    <>
                        <div className="is-invalid"></div>
                        <FormFeedback type="invalid">{validation.errors[name]}</FormFeedback>
                    </>
                ) : null
            }
        </div>
    )
}
