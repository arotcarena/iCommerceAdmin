import { EntityFieldValue } from "type/formTypes";
import { EntitySelectField } from "UI/Form/FormField/EntitySelectField";

type Props = {
    setFilterValue: (key: string, value: any) => void,
    name: string,
    value: EntityFieldValue,
    endpoint: string,
    labelProperty: string,
    complementLabelProperty?: string,
    placeholder?: string,
    maxSuggestedItems?: number,
    defaultFilters?: {[key: string]: any}
};


export const ColumnFilterEntitySelectField = ({
    setFilterValue,
    name,
    value,
    endpoint,
    labelProperty,
    complementLabelProperty,
    maxSuggestedItems,
    placeholder,
    defaultFilters,
}: Props) => {

    const handleChange = (newValues: EntityFieldValue) => {
        setFilterValue(name, newValues);
    };

    return (
        <EntitySelectField
            key={name}
            multiple={true}
            endpoint={endpoint}
            name={name}
            value={value}
            onChange={handleChange}
            labelProperty={labelProperty}
            complementLabelProperty={complementLabelProperty}
            placeholder={placeholder}
            defaultIsOpen={false}
            maxSuggestedItems={maxSuggestedItems}
            defaultFilters={defaultFilters}
        />
    )
}
