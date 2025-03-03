import { useQuery } from "@tanstack/react-query";
import { useLoadContext } from "functions/customHooks/api/queries/contextQueries";
import { translateChoices } from "functions/form/choicesTranslator";
import { useEffect, useState } from "react";
import { EntityContext, GlobalContext, TabColumn } from "type/superCrudTypes";

export const useRetrieveEntityContext = (
    entity: string,
    forceColumns?: string[],
    forceContext?: EntityContext,
): {
    columns: TabColumn[],
    setColumns: React.Dispatch<React.SetStateAction<TabColumn[]>>,
    globalContext: GlobalContext
} => {

    const loadContextColumns = useLoadContext(entity);
    const {data, isSuccess} = useQuery({
      queryKey: ['item_columns', entity],
      queryFn: () => loadContextColumns(),
      initialData: []
    });

    const [columns, setColumns] = useState<TabColumn[]>([]);
    const [globalContext, setGlobalContext] = useState<GlobalContext>({
        isEditable: true,
        isDeletable: true,
        labelProperty: 'id'
    });

    useEffect(() => {
        // if forced context
        if(forceContext) {
            if(columns.length === 0) {
                setColumns(forceContext.columns);
                setGlobalContext(forceContext.globalContext);
            }
            return;
        }

        if(!isSuccess || !data || data.length < 1) {
            return;
        }
        //translate choices and set columns
        let cols: any = data.map(dataColumn => ({
            ...dataColumn,
            choices: dataColumn.choices ? translateChoices(dataColumn.choices): undefined
        }));
        //global context
        const global: any = cols.find((col: TabColumn) => col.name === 'globalContext');
        if(globalContext) {
            setGlobalContext(prevGlobalContext => ({
                isEditable: global?.isEditable ?? prevGlobalContext.isEditable,
                isDeletable: global?.isDeletable ?? prevGlobalContext.isDeletable,
                labelProperty: global?.labelProperty ?? prevGlobalContext.labelProperty
            }));
        }
        // order columns
        // use global order
        if(global && global.order && !forceColumns) {
            let orderedCols = [];
            // put the properties following order context
            for(const fieldName of global.order) {
                const col = cols.find((col: TabColumn) => col.name === fieldName);
                if(col) {
                    orderedCols.push(col);
                }
            }
            // if some properties are not sent in order context, we push them at the end of array
            if(cols.length > orderedCols.length) {
                for(const col of cols) {
                    if(!orderedCols.find(oc => oc.name === col.name)) {
                        orderedCols.push(col);
                    }
                }
            }
            cols = orderedCols;
        }
        // if forceColumns dont use global order
        if(forceColumns)
        {   
            let forcedCols = [];
            for(const forceColumn of forceColumns) {
                const col = cols.find((col: TabColumn) => col.name === forceColumn);
                if(col) {
                    col.isVisible = true;
                    forcedCols.push(col);
                }
            }
            cols = forcedCols;
        }

        setColumns(cols.filter((col: TabColumn) => col.name !== 'globalContext'));
    }, [isSuccess, data]);

    return {
        columns,
        setColumns,
        globalContext
    };
}
