import { ApiEntityContext } from "type/entityTypes";
import { TabColumn } from "type/superCrudTypes";


export const convertContextToTabColumns = (entityContext: ApiEntityContext): TabColumn[] => {
    
    const fullEditable = entityContext.isEnabled;

    //transform to array
    let columns = [];
    for(const [field, fieldContext] of Object.entries(entityContext)) {
        //fields without @id key are used only in backend
        if(fieldContext['@id'] && field !== 'parentContext') {
            let column = {
                name: field,
                ...fieldContext,
                type: fieldContext['@type'],
                id: fieldContext['@id'],
                isEditable: fullEditable === false ? false: fieldContext.isEditable,
                isSortable: fieldContext.isSortable !== false,
                isFiltrable: fieldContext.isFiltrable !== false,
            };
            delete column['@id'];
            delete column['@type'];
            columns.push(column);
        }
    }
    return columns;
}