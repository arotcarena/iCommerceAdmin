import { PropsWithChildren } from "react"
import { Label } from "reactstrap"
import Select from "react-select"
import { convertChoicesToOptions } from "functions/api/convertor/choicesToOptionsConvertor"
import { ChoicesType, SelectOption } from "type/formTypes"


type Props = PropsWithChildren<{
    name: string,
    value?: string|number,
    onChange: (optionValue: string|number) => void,
    choices: ChoicesType,
    placeholder?: string,
    [key: string]: any
}>

export const SelectField = ({
    name,
    value,
    onChange,
    choices,
    children,
    placeholder,
    ...props
}: Props) => {

    const handleChange = (option: SelectOption) => {
        onChange(option.value);
    };

    const options = convertChoicesToOptions(choices);

    return (
        <div className="select-zindex-group">
            {
                children && (
                    <Label htmlFor={name} className="form-label">{children}</Label>
                )
            }
            <Select
                name={name}
                value={options.filter(option => value == option.value)}
                options={options}
                onChange={handleChange}
                placeholder={placeholder || ''}
                {...props}
            />
        </div>
    )
}
