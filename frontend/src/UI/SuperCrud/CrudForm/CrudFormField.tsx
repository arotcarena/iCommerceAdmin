import { TabColumn } from "type/superCrudTypes";
import { DynamicFormField } from "UI/Form/DynamicFormField";
import { CrudConditionalDisplay } from "../Utils/CrudConditionalDisplay";
import { useSuperCrud } from "Components/Contexts/SuperCrudContext";
import { resolveChoiceFieldsDefaultFilters } from "functions/crud/choiceFieldsDefaultFiltersResolver";

type Props = {
    column?: TabColumn,
    validation: any,
    disabled?: boolean,
    margin?: number,
    fullWidth?: boolean,
    onChange?: () => void,//if we want to do a special action when a field changes
    [key: string]: any
};

export const CrudFormField = ({
    column,
    validation,
    disabled = false,
    margin = 4,
    fullWidth = false,
    onChange,
    ...props
}: Props) => {
    const {choiceFieldsDefaultFiltersRenderer} = useSuperCrud();

    const defaultFilters = resolveChoiceFieldsDefaultFilters(validation.value, choiceFieldsDefaultFiltersRenderer, column);

    return (
        <CrudConditionalDisplay column={column} handleIsVisible={false}>
            <DynamicFormField
                column={column}
                validation={validation}
                disabled={column?.isEditable === false ? true: disabled}
                margin={margin}
                fullWidth={fullWidth}
                onChange={onChange}
                defaultFilters={defaultFilters}
                {...props}
            />
        </CrudConditionalDisplay>
    )
}
