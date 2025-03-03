import { EntityFieldValue } from "type/formTypes";
import { EntitySuggestField } from "UI/Form/FormField/EntitySuggestField";

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


export const ColumnFilterEntitySuggestField = ({
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
        <div style={{minWidth: '220px'}}>
            <EntitySuggestField
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
                waitFirstOpeningToLoad={true}
                defaultFilters={defaultFilters}
            />
        </div>
    )
}
