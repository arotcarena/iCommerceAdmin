import { TabColumn } from "type/superCrudTypes";
import { convertContextToTabColumns } from "functions/api/convertor/apiPlatformConversion/contextToTabColumnsConvertor";
import { useApiRequest } from "../useApiRequest";
import { ApiEntityContext } from "type/entityTypes";

/**
 * Retrieve the context of the entity.
 * If has parent entity, retrieve context of parent and combine both on TabColumn array
 * 
 * @param entity 
 * @returns 
 */
export const useLoadContext = (
    entity: string,
): (() => Promise<TabColumn[]>) => {

    const doApiRequest = useApiRequest();

    const loadContextColumns = async (): Promise<TabColumn[]> => {
        let tabColumns = [];
        
        try {
            const contextResponse = await doApiRequest<any>('/api/contexts/'+ entity, {}, 'GET');
            const entityContext: ApiEntityContext = contextResponse['@context'];
            tabColumns = convertContextToTabColumns(entityContext);

            if(entityContext?.parentContext?.parentEntity) {
                const parentContextResponse = await doApiRequest<any>(
                    '/api/contexts/'+ entityContext.parentContext.parentEntity,
                    {},
                    'GET',
                );
                const parentContext: ApiEntityContext = parentContextResponse['@context'];
                const parentTabColumns = convertContextToTabColumns(parentContext);
                //overwrite columns that are on the parent
                for(const parentTabColumn of parentTabColumns) {
                    const existantColumn = tabColumns.find(col => col.name === parentTabColumn.name);
                    if(existantColumn) {
                        tabColumns = tabColumns.map(col => col.name === parentTabColumn.name ? parentTabColumn: col);
                    } else {
                        tabColumns.push(parentTabColumn);
                    }
                }
            }
            return tabColumns;
        } catch(e) {
            throw e;
        }
    }

    return loadContextColumns;
}
