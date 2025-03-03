import { TabColumn, TabColumnType } from "type/superCrudTypes"
import { TabCellTextField } from "./TabCellInputs/TabCellTextField"
import { TabCellTextareaField } from "./TabCellInputs/TabCellTextareaField"
import { TabCellDatePicker } from "./TabCellInputs/TabCellDatePicker"
import { TabCellBool } from "./TabCellInputs/TabCellBool"
import { TabCellSelect } from "./TabCellInputs/TabCellSelect"
import { TabCellImageField } from "./TabCellInputs/TabCellImageField"
import { TabCellHtmlField } from "./TabCellInputs/TabCellHtmlField"
import { TabCellAddressField } from "./TabCellInputs/TabCellAddressField"
import { TabCellEntityField } from "./TabCellInputs/TabCellEntityField"

type Props = {
    column: TabColumn,
    onSubmit: () => void,
    closeEdit: () => void,
    validation: any,
    defaultFilters?: {[key: string]: any},
}

export const TabCellInput = ({
    column,
    onSubmit,
    closeEdit,
    validation,
    defaultFilters,
}: Props) => {
    
    const {type} = column;

    return (
        <>
            {
                (['text', 'email', 'password', 'int', 'float', 'decimal', 'price'].includes(type)) && (
                    <TabCellTextField
                        validation={validation} 
                        type={type} 
                        closeEdit={closeEdit} 
                        onSubmit={onSubmit}
                        constraints={column?.constraints}
                    />
                )
            }
            {
                (type === 'textarea') && (
                    <TabCellTextareaField 
                        validation={validation} 
                        type={column.type} 
                        closeEdit={closeEdit} 
                        onSubmit={onSubmit} 
                        field={column.name}
                    />
                )
            }
            {
                (type === 'date' || type === 'datetime') && (
                    <TabCellDatePicker
                        enableTime={column.type === 'datetime'}
                        validation={validation}
                        closeEdit={closeEdit}
                        onSubmit={onSubmit}
                        field={column.name}
                    />
                )
            }
            {
                (type === 'bool') && (
                    <TabCellBool
                        validation={validation}
                        onSubmit={onSubmit}
                        closeEdit={closeEdit}
                    />
                )
            }
            {
                (type === 'choice' && column?.choices) && (
                    <TabCellSelect
                        validation={validation}
                        multiple={column?.multiple ? true: false}
                        choices={column.choices} 
                        closeEdit={closeEdit} 
                        onSubmit={onSubmit} 
                        defaultFilters={defaultFilters}
                    />
                )
            }
            {
                (type === 'choice' && column?.endpoint && column?.labelProperty) && (
                    <TabCellEntityField
                        validation={validation}
                        multiple={column?.multiple ? true: false}
                        endpoint={column.endpoint}
                        labelProperty={column.labelProperty}
                        complementLabelProperty={column?.complementLabelProperty}
                        closeEdit={closeEdit}
                        onSubmit={onSubmit}
                        maxSuggestedItems={column?.maxSuggestedItems}
                        showFullChoiceList={column.showFullChoiceList}
                        defaultFilters={defaultFilters}
                    />
                )
            }
            {
                type === 'image' && (
                    <TabCellImageField
                        validation={validation}
                        multiple={column?.multiple ? true: false}
                        acceptedFormats={column?.constraints?.acceptedFormats}
                        minSize={column?.constraints?.minSize}
                        maxSize={column?.constraints?.maxSize}
                        maxCount={column?.constraints?.maxCount}
                        required={column?.constraints?.required}
                        closeEdit={closeEdit}
                        onSubmit={onSubmit}
                        field={column.name}
                        entityAttachmentType={column?.entityAttachmentType}
                    />
                )
            }
            {
                type === 'html' && (
                    <TabCellHtmlField
                        validation={validation}
                        closeEdit={closeEdit}
                        onSubmit={onSubmit}
                        field={column.name}
                        toolsConfig={column?.toolsConfig}
                    />
                )
            }
            {
                type === 'address' && (
                    <TabCellAddressField
                        validation={validation}
                        closeEdit={closeEdit}
                        onSubmit={onSubmit}
                        multiple={column?.multiple ? true: false}
                        field={column.name}
                    />
                )
            }
        </>
    )
}
