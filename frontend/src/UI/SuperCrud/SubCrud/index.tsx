import { ReactNode } from "react";
import { SuperCrud } from "..";
import { TabColumn, RenderForm } from "../../../type/superCrudTypes";
import { Item } from "type/searchTypes";

type Props = {
    validation: any, 
    column: TabColumn,
    basePath: string,
    parentId?: number,
    title: string,
    parentEndpoint: string,
    parentPropertyName: string,
    disabled?: boolean,
    renderForm?: RenderForm,
    defaultItemsPerPage?: number,
    hiddenFields?: string[],
    storeFormDataKey?: string,//if this value is provided, form create data will be stored
    storeFiltersKey?: string,//if this value is not provided, entity name will be used has storage key
    hasLineCreate?: boolean,
    renderAdditionalControl?: (id?: number) => ReactNode,
    dataTransformerFn?: (formData: any) => any,
    choiceFieldsDefaultFiltersRenderer?: (item?: Item, parentIri?: string, parentPropertyName?: string) => {[field: string]: {[key: string]: any}} | undefined,
    forceColumns?: string[],
};

export const SubCrud = ({
    validation,//use it if there is constraints like notNull on subCrud property
    column,
    basePath,
    parentId,
    parentEndpoint,
    parentPropertyName,
    renderForm,
    title,
    disabled,
    defaultItemsPerPage = 20,
    hiddenFields,
    storeFormDataKey,
    storeFiltersKey,
    hasLineCreate = false,
    renderAdditionalControl,
    dataTransformerFn,
    choiceFieldsDefaultFiltersRenderer,
    forceColumns,
}: Props) => {

    if(!parentId) {
        throw new Error(title + ' superCrud dont receive customer id');
    }

    if(!column.targetClass || !column.endpoint) {
        throw new Error(parentPropertyName + ' ' + title + ' TabColumn hasn\'t all necessaries informations');
    }

    return (
        <SuperCrud
            key={title}
            title={title}
            entity={column.targetClass}
            endpoint={column.endpoint}
            defaultItemsPerPage={defaultItemsPerPage}
            basePath={basePath}
            usePatchToUpdate={true}
            hasLineCreate={hasLineCreate}
            parentIri={parentEndpoint + '/' + parentId}
            parentPropertyName={parentPropertyName}
            disabled={disabled}
            renderForm={renderForm}
            hiddenFields={hiddenFields}
            storeFormDataKey={storeFormDataKey}
            storeFiltersKey={storeFiltersKey}
            renderAdditionalControl={renderAdditionalControl}
            dataTransformerFn={dataTransformerFn}
            choiceFieldsDefaultFiltersRenderer={choiceFieldsDefaultFiltersRenderer}
            forceColumns={forceColumns}
        />
    );
}
