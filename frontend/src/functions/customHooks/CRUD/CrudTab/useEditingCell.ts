import { KeyboardEvent, useState } from "react";
import { Item } from "type/searchTypes";
import { EditingCell, TabColumn, TabItemType } from "type/superCrudTypes";

export const useEditingCell = (
    columns: TabColumn[],
    items: TabItemType[],
    itemIsEditableCondition?: (item: Item) => boolean,
): {
    editingCell: EditingCell|null,
    editCell: (item: TabItemType, field: string) => void,
    handleKeyDown: (e: KeyboardEvent) => void,
    closeEdit: () => void,
    editPrevCell: () => void,
    editNextCell: () => void,
} => {
    
    const [editingCell, setEditingCell] = useState<EditingCell|null>(null);

    const editNextCell = (): void => {
        setEditingCell(editingCell => {
            if(!editingCell) {
                return null;
            }
            const field = getNextVisibleField(editingCell.field);
            if(field) {
                return {...editingCell, field};
            }
            //if no next field, go to next item and first visible field
            const item = getNextEditableItem(editingCell.item.id);
            const newField = columns.find(col => col.isVisible && col.isEditable)?.name;
            if(item && newField) {
                return {item, field: newField};
            }
            return null;
        })
    };

    const editPrevCell = (): void => {
        setEditingCell(editingCell => {
            if(!editingCell) {
                return null;
            }
            const field = getPreviousVisibleField(editingCell.field);
            if(field) {
                return {...editingCell, field};
            }
            //if no previous field, go to previous item and last visible field
            const item = getPreviousEditableItem(editingCell.item.id);
            let newField = null;
            if(item) {
                for(let index = columns.length; index >= 0; index--) {
                    if(columns[index] && columns[index].isVisible && columns[index].isEditable) {
                        newField = columns[index].name;
                        return {item, field: newField};
                    }
                }
            }
            return null;
        })
    }

    const getNextEditableItem = (id: number): TabItemType|null => {
        const index = items.findIndex(item => item.id === id);
        const newIndex = index + 1;
        
        for(let i = newIndex; i < newIndex + 100; i++) {
            if(items[i] && (!itemIsEditableCondition || itemIsEditableCondition(items[i]))) {
                return items[i];
            }
        }
        return null;
    }

    const getPreviousEditableItem = (id: number): TabItemType|null => {
        const index = items.findIndex(item => item.id === id);
        const newIndex = index - 1;
        
        for(let i = newIndex; i >= 0; i--) {
            if(items[i] && (!itemIsEditableCondition || itemIsEditableCondition(items[i]))) {
                return items[i];
            }
        }
        return null;
    }

    const getNextVisibleField = (field: string): string|null => {
        const index = columns.findIndex(col => col.name === field);
        const newIndex = index + 1;
        //search next col visible and updatable
        for(let index = newIndex; index < newIndex + 100; index++) {
            if(columns[index] && columns[index].isVisible && columns[index].isEditable) {
                return columns[index].name;
            }
        }
        //if no next col is visible
        return null;
    }

    const getPreviousVisibleField = (field: string): string|null => {
        const index = columns.findIndex(col => col.name === field);
        const newIndex = index - 1;
        //search next col visible and updatable
        for(let index = newIndex; index >= 0; index--) {
            if(columns[index] && columns[index].isVisible && columns[index].isEditable) {
                return columns[index].name;
            }
        }
        //if no prev col is visible
        return null;
    }

    const handleKeyDown = (e: KeyboardEvent): void => {
        if(e.key === 'Tab' && e.shiftKey) {
            e.preventDefault();
            editPrevCell();
        } else if(e.key === 'Tab') {
            e.preventDefault();
            editNextCell();
        }
    };

    
    const editCell = (item: TabItemType, field: string) => {
        setEditingCell({item, field});
    }

    const closeEdit = (): void => {
        setEditingCell(null);
    }

    return {
        editingCell,
        editCell,
        handleKeyDown,
        closeEdit,
        editNextCell,
        editPrevCell,
    };
}