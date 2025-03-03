import { PropsWithChildren } from "react"
import { Label } from "reactstrap"
import Select from "react-select"
import { convertChoicesToOptions } from "functions/api/convertor/choicesToOptionsConvertor"
import { ChoicesType, SelectOption } from "type/formTypes"


type Props = PropsWithChildren<{
    name: string,
    values?: string,
    onChange: (value: any[]) => void,
    choices: ChoicesType,
    placeholder?: string,
    [key: string]: any
}>

export const SelectMultiField = ({
    name,
    values,
    onChange,
    choices,
    children,
    placeholder,
    ...props
}: Props) => {

    const handleChange = (options: SelectOption[]) => {
        onChange(options.map(option => option.value));
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
                isMulti={true}
                value={options.filter(option => values && values.split(',').includes(option.value.toString()))}
                options={options}
                onChange={handleChange}
                placeholder={placeholder || ''}
                {...props}
            />
        </div>
    )
}
