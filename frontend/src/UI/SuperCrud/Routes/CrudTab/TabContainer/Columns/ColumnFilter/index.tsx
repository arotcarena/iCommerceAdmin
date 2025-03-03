import { ColumnFilterTextField } from "./ColumnFilterInputs/ColumnFilterTextField";
import { ColumnFilterNumberField } from "./ColumnFilterInputs/ColumnFilterNumberField";
import { ColumnFilterBool } from "./ColumnFilterInputs/ColumnFilterBool";
import { ColumnFilterSelect } from "./ColumnFilterInputs/ColumnFilterSelect";
import { ColumnFilterEntitySuggestField } from "./ColumnFilterInputs/ColumnFilterEntitySuggestField";
import { ColumnFilterDatePicker } from "./ColumnFilterInputs/ColumnFilterDatePicker";
import { TabColumn } from "type/superCrudTypes";
import { FiltersType } from "type/searchTypes";
import { ColumnFilterEntitySelectField } from "./ColumnFilterInputs/ColumnFilterEntitySelectField";

type Props = {
    column: TabColumn,
    setFilterValue: (key: string, value: string|number) => void,
    resetFilter: (key: string) => void,
    filters: FiltersType,
    choiceFieldDefaultFilters?: {[key: string]: any}
};

export const ColumnFilter = ({
    column,
    setFilterValue,
    resetFilter,
    filters,
    choiceFieldDefaultFilters,
}: Props) => {
    const type = column.type;

    return (
        <>
            {
                ['text', 'email', 'textarea', 'html'].includes(type) && (
                    <ColumnFilterTextField
                        filter={filters[column.name]?.toString()}
                        setFilterValue={setFilterValue}
                        name={column.name}
                    />
                )
            }
            {
                ['int', 'float', 'decimal', 'price'].includes(type) && (
                    <ColumnFilterNumberField
                        type={column.type}
                        minFilter={filters['min_' + column.name]?.toString()}
                        maxFilter={filters['max_' + column.name]?.toString()}
                        setFilterValue={setFilterValue}
                        minName={'min_' + column.name}
                        maxName={'max_' + column.name}
                    />
                )
            }
            {
                type === 'bool' && (
                    <ColumnFilterBool
                        filter={filters[column.name]}
                        setFilterValue={setFilterValue}
                        name={column.name}
                    />
                )
            }
            {
                (type === 'choice' && column?.choices) && (
                    <ColumnFilterSelect
                        filter={filters[column.name]}
                        setFilterValue={setFilterValue}
                        name={column.name}
                        choices={column.choices}
                    />
                )
            }
            {
                (type === 'choice' && column?.endpoint && column?.labelProperty) && (
                    column?.showFullChoiceList ? (
                        <ColumnFilterEntitySelectField
                            value={filters[column.name]}
                            setFilterValue={setFilterValue}
                            name={column.name}
                            endpoint={column.endpoint}
                            labelProperty={column.labelProperty}
                            complementLabelProperty={column?.complementLabelProperty}
                            maxSuggestedItems={column?.maxSuggestedItems}
                            defaultFilters={choiceFieldDefaultFilters}
                        />
                    ): (
                        <ColumnFilterEntitySuggestField
                            value={filters[column.name]}
                            setFilterValue={setFilterValue}
                            name={column.name}
                            endpoint={column.endpoint}
                            labelProperty={column.labelProperty}
                            complementLabelProperty={column?.complementLabelProperty}
                            maxSuggestedItems={column?.maxSuggestedItems}
                            defaultFilters={choiceFieldDefaultFilters}
                        />
                    )
                )
            }
            {
                (type === 'date' || type === 'datetime') && (
                    <ColumnFilterDatePicker
                        afterFilter={filters['after_' + column.name]?.toString()}
                        beforeFilter={filters['before_' + column.name]?.toString()}
                        afterName={'after_' + column.name}
                        beforeName={'before_' + column.name}
                        setFilterValue={setFilterValue}
                        resetFilter={resetFilter}
                        enableTime={false}
                        label={column.name}
                    />
                )
            }
        </>
    )
}
