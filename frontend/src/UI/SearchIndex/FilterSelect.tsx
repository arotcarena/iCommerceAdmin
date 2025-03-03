import Select from "react-select"
import { FilterSelectOption } from "type/formTypes";



type Props = {
    options: FilterSelectOption[],
    setFilterValue: (key: string, value: string|number|null) => void,
    value?: string|number|undefined,
    defaultValue?: number|string,
    name: string,
    placeholder?: string
};

export const FilterSelect = ({
    options,
    setFilterValue,
    value,
    defaultValue,
    name,
    placeholder = 'Filter',
}: Props) => {

    const handleChange = (option: FilterSelectOption) => {
        setFilterValue(name, option.value);
    }

    return (
        <Select
            options={options}
            value={options.find(option => option.value === value) ?? {label: placeholder, value: defaultValue ?? ''}}
            onChange={handleChange}
            name={name}
            placeholder={placeholder}
        />
    )
}