import { Item } from "type/searchTypes";
import { TabColumn } from "type/superCrudTypes";
import { resolveDefaultFieldValue } from "./defaultItemCreator";

export const createUpdateData = (item: Item, columns: TabColumn[]): {[key: string]: any} => {
    let preparedItem: {[key: string]: any} = item;
    for(const column of columns) {
        //when no value, create default values
        if(!Object.keys(item).includes(column.name)) {
            preparedItem[column.name] = resolveDefaultFieldValue(column);
        }
    }

    return preparedItem;
};
