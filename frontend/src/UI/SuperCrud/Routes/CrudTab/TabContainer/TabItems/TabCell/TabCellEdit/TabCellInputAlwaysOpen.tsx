import { TabColumn, TabItemType } from "type/superCrudTypes"
import { TabCellTextFieldAlwaysOpen } from "./TabCellInputsAlwaysOpen/TabCellTextFieldAlwaysOpen";
import { useEffect, useRef } from "react";
import { TabCellEntityFieldAlwaysOpen } from "./TabCellInputsAlwaysOpen/TabCellEntityFieldAlwaysOpen";

type Props = {
    column: TabColumn,
    onSubmit: () => void,
    validation: any,
    isEditing: boolean,
    editCell: (item: TabItemType, field: string) => void,
    editNextCell: () => void,
    item: TabItemType,
    closeEdit: () => void,
    defaultFilters?: {[key: string]: any},
}

export const TabCellInputAlwaysOpen = ({
    column,
    onSubmit,
    validation,
    isEditing,
    editCell,
    editNextCell,
    item,
    closeEdit,
    defaultFilters,
}: Props) => {
    const handleFocus = () => {
        editCell(item, column.name);
    }
    
    const ref = useRef<HTMLDivElement|null>(null);
    useEffect(() => {
        if(ref.current && isEditing) {
            ref.current.querySelector('input')?.focus();
        }
    }, [isEditing, ref.current]);

    const {type} = column;

    return (
        <div ref={ref} className="cell-always-open-input-wrapper">
            {
                (['text', 'email', 'password', 'int', 'float', 'decimal', 'price'].includes(type)) && (
                    <TabCellTextFieldAlwaysOpen
                        validation={validation} 
                        type={type} 
                        onSubmit={onSubmit}
                        constraints={column?.constraints}
                        onFocus={handleFocus}
                        editNextCell={editNextCell}
                    />
                )
            }
            {
                (type === 'choice' && column?.endpoint && column?.labelProperty) && (
                    <TabCellEntityFieldAlwaysOpen
                        validation={validation}
                        multiple={column?.multiple ? true: false}
                        endpoint={column.endpoint}
                        labelProperty={column.labelProperty}
                        complementLabelProperty={column?.complementLabelProperty}
                        onSubmit={onSubmit}
                        maxSuggestedItems={column?.maxSuggestedItems}
                        onFocus={handleFocus}
                        isEditing={isEditing}
                        editNextCell={editNextCell}
                        showFullChoiceList={column.showFullChoiceList}
                        closeEdit={closeEdit}
                        defaultFilters={defaultFilters}
                    />
                )
            }
        </div>
    )
}
