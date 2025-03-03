import { TabColumn } from "type/superCrudTypes";

export const createDefaultItem = (columns: TabColumn[]): {[key: string]: any} => {
    let defaultItem = {};
    for(const column of columns) {
        defaultItem = {
            ...defaultItem,
            [column.name]: resolveDefaultFieldValue(column)
        };
    };
    return defaultItem;
};

export const resolveDefaultFieldValue = (column: TabColumn): any => {
    let defaultValue: any = '';
    if(column.type === 'bool') {
        defaultValue = false;
    }
    if(['choice', 'date', 'datetime', 'image', 'address'].includes(column.type)) {
        defaultValue = null;
        if(column.multiple) {
            defaultValue = [];
        }
    }
    if(['int', 'float', 'price'].includes(column.type)) {
        defaultValue = null;
    }
    if(column.type === 'relation') {
        defaultValue = undefined;
    }
    //if there is a default value received from api
    if(column.default !== undefined) {
        defaultValue = column.default;
    }
    
    return defaultValue;
}

