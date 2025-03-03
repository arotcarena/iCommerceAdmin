import { ColumnsSelection, TabColumn } from "type/superCrudTypes";


export const storeColumnsSelection = (entity: string, columns: TabColumn[]): void => {

    const columnsSelection: ColumnsSelection = columns.map(column => ({
        name: column.name,
        isVisible: column.isVisible
    }));

    localStorage.setItem(
        getColumnsSelectionStorageKey(entity), 
        JSON.stringify(columnsSelection)
    );
}

export const getStoredColumnsSelection = (entity: string, columns: TabColumn[]): TabColumn[]|null => {
    const data = localStorage.getItem(
        getColumnsSelectionStorageKey(entity)
    );

    if(data) {
        const columnsSelection: ColumnsSelection = JSON.parse(data);
        return columns.map(column => ({
            ...column,
            isVisible: columnsSelection.find(cs => cs.name === column.name)?.isVisible ?? column.isVisible
        }));
    }
    return null;
}

export const resetStoredColumnsSelection = (entity: string) => {
    localStorage.removeItem(
        getColumnsSelectionStorageKey(entity)
    );
}

const getColumnsSelectionStorageKey = (entity: string): string => {
    return 'columns_' + entity + '.selection';
}
