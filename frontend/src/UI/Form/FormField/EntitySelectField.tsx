import { PropsWithChildren, useEffect, useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import { useLoadItems } from "functions/customHooks/api/queries/itemQueries"
import { EntityFieldValue, SelectOption } from "type/formTypes"
import { resolveEntityLabel } from "functions/entity/entityLabelResolver"
import { EntityType } from "type/entityTypes"
import Select from "react-select"
import { Label } from "reactstrap"
import { SelectDisabled } from "../FormFieldParts/SelectDisabled"


type Props = PropsWithChildren<{
    multiple?: boolean, 
    endpoint: string,
    defaultFilters?: {[key: string]: any},
    value: EntityFieldValue,
    onChange: (value: EntityFieldValue) => void,
    labelProperty?: string,
    complementLabelProperty?: string,
    onClose?: () => void,
    placeholder?: string,
    margin?: number,
    defaultIsOpen?: boolean,
    disabled?: boolean,
    customEntityLabelResolver?: (entity: EntityType) => string,
    onCellFocus?: () => void, // used for tab cells always open
    submitOnTabKeyDown?: boolean,
    [key: string]: any
}>

export const EntitySelectField = ({
    multiple = false,
    endpoint,
    defaultFilters,
    labelProperty,
    complementLabelProperty,
    customEntityLabelResolver,
    defaultIsOpen,
    name,
    value,
    onChange,
    children,
    placeholder,
    disabled = false,
    onCellFocus,
    submitOnTabKeyDown = true,
    ...props
}: Props) => {

    const handleChange = (value: SelectOption|SelectOption[]) => {
        if(Array.isArray(value)) {
            onChange(
                value.map((selectOption: SelectOption) => selectOption.value)
            );
            return;
        }
        onChange(value.value);
    }

    const handleFocus = () => {
        // for tab cells always open
        if(onCellFocus) {
            onCellFocus();
        }
    };

    const loadItems = useLoadItems(endpoint, 300);
    const {data, isFetching} = useQuery({
        queryKey: ['entity_select', endpoint, defaultFilters],
        queryFn: () => loadItems(defaultFilters ?? {}),
        initialData: null,
    });

    const options: SelectOption[] = useMemo(() => {
        let options: SelectOption[] = [];
        if(data?.items && data.items.length > 0) {
            for(const item of data.items) {
                //to force EntityType
                const entityItem = {
                    '@id': item['@id'],
                    ...item
                };
                const label = resolveEntityLabel(entityItem, labelProperty, complementLabelProperty, customEntityLabelResolver)
                const value = entityItem;
                options.push({label, value});
            }
        }
        return options;
    }, [data?.items]);

    const selectedOptions = options.filter((option: SelectOption) => {
        if(!value) {
            return false;
        }
        if(Array.isArray(value)) {
            return value.find((v: EntityType) => v.id === option.value.id) ? true: false;
        }
        return value.id === option.value.id;
    });

    if(disabled) {
        let disabledValue = selectedOptions;
        if(!multiple) {
            disabledValue = selectedOptions?.length > 0 ? selectedOptions[0].value: null;
        }
        return (
            <SelectDisabled
                multiple={multiple}
                margin={props.margin}
                name={name}
                value={disabledValue}
                options={options}
            >
                {children}
            </SelectDisabled>
        )
    }

    return (
        <div className="select-zindex-group">
            {
                children && (
                    <Label htmlFor={name} className="form-label">{children}</Label>
                )
            }
            <Select
                isMulti={multiple}
                value={selectedOptions}
                options={options}
                onChange={handleChange}
                placeholder={placeholder || ''}
                onFocus={handleFocus}
                menuIsOpen={defaultIsOpen ? true: undefined}
                tabSelectsValue={submitOnTabKeyDown}
                {...props}
            />
        </div>
    )
}
