import { SelectMultiField } from "UI/Form/FormField/SelectMultiField";

type Props = {
    filter?: string|number,
    setFilterValue: (key: string, value: any) => void,
    placeholder?: string,
    name: string,
    choices: {[label: string]: string|number}
}

export const ColumnFilterSelect = ({
    filter,
    setFilterValue,
    placeholder,
    name,
    choices
}: Props) => {

    const handleChange = (value: any[]) => {
        //if value is an empty array, pass undefined to tell that this field is no more filtered
        setFilterValue(name, value.length === 0 ? undefined: value);
    };

    return (
        <div className="large-select-wrapper" style={{minWidth: '180px'}}>
            <SelectMultiField
                values={filter?.toString()}
                choices={choices}
                onChange={handleChange}
                name={name}
                placeholder={placeholder}
            />
        </div>
    );
}
