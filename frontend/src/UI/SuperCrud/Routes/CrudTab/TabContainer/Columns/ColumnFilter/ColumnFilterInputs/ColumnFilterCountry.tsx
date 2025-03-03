import { CountryField } from "UI/Form/FormField/CountryField";

type Props = {
    filter?: string|number,
    setFilterValue: (key: string, value: any) => void,
    placeholder?: string,
    name: string,
}

export const ColumnFilterCountry = ({
    filter,
    setFilterValue,
    placeholder,
    name,
}: Props) => {

    const handleChange = (value: any[]) => {
        //if value is an empty array, pass empty string to tell that this field is no more filtered
        setFilterValue(name, value.length === 0 ? '': value);
    };

    return (
        <div className="large-select-wrapper">
            <CountryField
                value={filter?.toString()}
                onChange={handleChange}
                name={name}
                placeholder={placeholder}
                multiple={true}
            />
        </div>
    );
}