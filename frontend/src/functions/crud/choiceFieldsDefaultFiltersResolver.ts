import { Item } from "type/searchTypes";
import { TabColumn } from "type/superCrudTypes";

export const resolveChoiceFieldsDefaultFilters = (
    item?: Item,
    choiceFieldsDefaultFiltersRenderer?: (item?: Item) => {[field: string]: {[key: string]: any}} | undefined,
    column?: TabColumn,
) => {
    let defaultFilters: {[key: string]: any} | undefined = undefined;
    if(choiceFieldsDefaultFiltersRenderer && column) {
        const choiceFieldsDefaultFilters = choiceFieldsDefaultFiltersRenderer(item);
        if(choiceFieldsDefaultFilters) {
            defaultFilters = choiceFieldsDefaultFilters[column.name] ?? undefined;
        }
    }

    return defaultFilters;
}
