import { PropsWithChildren, ReactNode, createContext, useContext } from "react";
import { Item } from "type/searchTypes";
import { CustomFilterRenderer, GlobalContext, LineInfo, Renderer, TabColumn, TabItemType } from "type/superCrudTypes";

type SuperCrudContextType = {
    title: string,
    items: TabItemType[],
    isLoading: boolean,
    columns: TabColumn[],
    renderers?: {[field: string]: Renderer},
    basePath: string,
    showEndpoint: string,
    writeEndpoint: string,
    entity: string,
    forceFetch: () => void,
    hasLineCreate: boolean,
    parentIri?: string,
    parentPropertyName?: string,
    disabled?: boolean,//for a subCrud on a show page
    storeFormDataKey?: string,
    storeFormDataPersistantFields?: string[],
    hiddenFields?: string[],
    globalContext: GlobalContext,
    customFilterRenderers?: {[key: string]: CustomFilterRenderer},
    renderAdditionalControl?: (id?: number) => ReactNode,
    renderCustomActionControlOnMultipleSelect?: (selectedItems: number[], clearSelectedItems: () => void, deleteButtonIsVisible: boolean) => ReactNode,
    renderCustomActionControlOnLineOver?: (item: Item, controlsAreOpen: boolean, forceFetch: () => void) => ReactNode,
    renderCustomActionControlSide?: 'left' | 'right',
    dataTransformerFn?: (formData: any) => any,
    lineInfo?: LineInfo,
    lineAlert?: LineInfo,
    itemIsDeletableCondition?: (item: Item) => boolean,//a callback to know if item can be deleted or not
    itemIsEditableCondition?: (item: Item) => boolean,//a callback to know if item can be edited or not
    fieldIsEditableCondition?: (item: Item, field: string) => boolean,//a callback to know if field can be edited or not for each item
    itemIsSelectableCondition?: (item: Item) => boolean,//a callback to know if item can be selected or not (checkboxes)
    redirectOnUpdate?: boolean,
    redirectToUpdateAfterCreate?: boolean,
    onSubmitSuccess?: () => void,
    isAlwaysCellEditing?: boolean,
    customValidation?: (formData: any) => string[], // return error messages
    choiceFieldsDefaultFiltersRenderer?: (item?: Item) => {[field: string]: {[key: string]: any}} | undefined,
    disablePagination?: boolean,
    renderCustomTitleOnEditPage?: (item: Item) => ReactNode,
    thinThead?: boolean,
    customCreateLabel?: string,
}


const SuperCrudContext = createContext<SuperCrudContextType|null>(null);


type Props = PropsWithChildren<SuperCrudContextType>;
  

export const SuperCrudProvider = ({children, ...props}: Props) => {
    return (
      <SuperCrudContext.Provider value={{...props}}>
        {children}
      </SuperCrudContext.Provider>
    )
}


export const useSuperCrud = (): SuperCrudContextType => {
  const context = useContext(SuperCrudContext);
  if(!context) {
    throw new Error('To use SuperCrudContext, you must wrap your component with <SuperCrudProvider>');
  }
  return context;
}
