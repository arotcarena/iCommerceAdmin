import React, { ReactNode, useEffect } from "react";

import { useRetrieveEntityContext } from "functions/customHooks/CRUD/CrudTab/useRetrieveEntityContext";
import { CrudTab } from "./Routes/CrudTab";
import { Navigate, Route, Routes } from "react-router-dom";
import { generateUrl } from "functions/router/urlGenerator";
import { CrudUpdate } from "./Routes/CrudUpdate";
import { CrudCreate } from "./Routes/CrudCreate";
import { CrudShow } from "./Routes/CrudShow";
import { useFilters } from "functions/customHooks/search/useFilters";
import { useLoadItems } from "functions/customHooks/api/queries/itemQueries";
import { SuperCrudProvider } from "Components/Contexts/SuperCrudContext";
import { useSearchIndex } from "functions/customHooks/search/useSearchIndex";
import { CustomFilterRenderer, EntityContext, LineInfo, RenderForm, Renderer } from "type/superCrudTypes";
import { scrollTop } from "functions/dom/scroll";
import { Item } from "type/searchTypes";
import { useTranslation } from "react-i18next";


type Props = {
  title: string,
  endpoint: string,
  showEndpoint?: string,
  writeEndpoint?: string,
  entity: string,
  defaultItemsPerPage?: number,
  renderers?: {
    [field: string]: Renderer
  },
  basePath: string,
  renderForm?: RenderForm,
  renderShow?: RenderForm,
  hasLineCreate?: boolean,
  usePatchToUpdate?: boolean,
  parentIri?: string,//in case of subCrud (superCrud child of superCrud parent)
  parentPropertyName?: string,// in case of subCrud
  disabled?: boolean,
  storeFormDataKey?: string,//if this value is provided, form create data will be stored
  storeFormDataPersistantFields?: string[],//these fields will persist even after validate form
  storeFiltersKey?: string,//if this value is not provided, entity name will be used has storage key
  storeColumnsSelectionKey?: string,
  hiddenFields?: string[],
  renderAdditionalControl?: (id?: number) => ReactNode,
  routeCreate?: ReactNode,
  routeUpdate?: ReactNode,
  routeShow?: ReactNode,
  customFilterRenderers?: {[key: string]: CustomFilterRenderer},
  renderCustomActionControlOnMultipleSelect?: (selectedItems: number[], clearSelectedItems: () => void, deleteButtonIsVisible: boolean) => ReactNode,
  renderCustomActionControlOnLineOver?: (item: Item, controlsAreOpen: boolean, forceFetch: () => void) => ReactNode,
  renderCustomActionControlSide?: 'left' | 'right',
  dataTransformerFn?: (formData: any) => any,
  lineInfo?: LineInfo,
  lineAlert?: LineInfo,
  itemIsDeletableCondition?: (item: Item) => boolean,
  itemIsEditableCondition?: (item: Item) => boolean,
  fieldIsEditableCondition?: (item: Item, field: string) => boolean,
  itemIsSelectableCondition?: (item: Item) => boolean,
  defaultFilters?: {[key: string]: any},
  defaultHiddenFilters?: {[key: string]: any},
  choiceFieldsDefaultFiltersRenderer?: (item?: Item) => {[field: string]: {[key: string]: any}} | undefined,
  redirectOnUpdate?: boolean,
  redirectToUpdateAfterCreate?: boolean,
  onSubmitSuccess?: () => void,
  restrictCreate?: boolean,
  forceColumns?: string[], // names of columns we want to appears (other columns will be totally ignored)
  isAlwaysCellEditing?: boolean,
  forceContext?: EntityContext,
  customValidation?: (formData: any) => string[], // return error messages
  seeAllIsAvailable?: boolean,
  qFilterParameterName?: string,
  disablePagination?: boolean,
  renderCustomTitleOnEditPage?: (item: Item) => ReactNode,
  thinThead?: boolean,
  customCreateLabel?: string,
}

export function SuperCrud({
  title,
  endpoint,
  showEndpoint,
  writeEndpoint,
  entity,
  defaultItemsPerPage = 10,
  renderers,
  basePath,
  renderForm,
  renderShow,
  hasLineCreate = false,
  usePatchToUpdate = false,
  parentIri,
  parentPropertyName,
  disabled,
  storeFormDataKey,
  storeFormDataPersistantFields,
  storeFiltersKey,
  storeColumnsSelectionKey,
  hiddenFields,
  renderAdditionalControl,
  routeCreate,
  routeUpdate,
  routeShow,
  customFilterRenderers,
  renderCustomActionControlOnMultipleSelect,
  renderCustomActionControlOnLineOver,
  renderCustomActionControlSide,
  dataTransformerFn,
  lineInfo,
  lineAlert,
  itemIsDeletableCondition,
  itemIsEditableCondition,
  fieldIsEditableCondition,
  itemIsSelectableCondition,
  defaultFilters,
  defaultHiddenFilters,
  choiceFieldsDefaultFiltersRenderer,
  redirectOnUpdate = true,
  redirectToUpdateAfterCreate = false,
  onSubmitSuccess,
  restrictCreate = false,
  forceColumns,
  isAlwaysCellEditing,
  forceContext,
  customValidation,
  seeAllIsAvailable = false,
  qFilterParameterName = 'q',
  disablePagination,
  renderCustomTitleOnEditPage,
  thinThead = false,
  customCreateLabel,
}: Props) {
  const {t} = useTranslation();
  
  //retrieve columns
  const {columns, setColumns, globalContext} = useRetrieveEntityContext(entity, forceColumns, forceContext);

  //search
  
  //filters
  //the default filters passed here will not appears as they are the normal filters state
  const {filters, setFilterValue, countFilters, resetFilters, resetFilter, canShowFilter, changePage} = useFilters(
    {page: 1},
    defaultFilters,
    storeFiltersKey ?? entity
  );

  //load items
  const loadItems = useLoadItems(endpoint, defaultItemsPerPage, parentIri, parentPropertyName, columns, defaultHiddenFilters);
  const { 
    result,
    forceFetch,
    isLoading,
    changePageWithCache,
  } = useSearchIndex(loadItems, filters, changePage, scrollTop, storeFiltersKey ?? entity);

  return (
    <SuperCrudProvider
      title={t(title)}
      items={result?.items || []}
      isLoading={isLoading}
      columns={columns}
      renderers={renderers}
      basePath={basePath}
      showEndpoint={showEndpoint || endpoint}
      writeEndpoint={writeEndpoint || endpoint}
      entity={entity}
      forceFetch={forceFetch}
      hasLineCreate={hasLineCreate}
      parentIri={parentIri}
      parentPropertyName={parentPropertyName}
      disabled={disabled}
      storeFormDataKey={storeFormDataKey}
      storeFormDataPersistantFields={storeFormDataPersistantFields}
      hiddenFields={hiddenFields}
      globalContext={globalContext}
      customFilterRenderers={customFilterRenderers}
      renderAdditionalControl={renderAdditionalControl}
      renderCustomActionControlOnMultipleSelect={renderCustomActionControlOnMultipleSelect}
      renderCustomActionControlOnLineOver={renderCustomActionControlOnLineOver}
      renderCustomActionControlSide={renderCustomActionControlSide}
      dataTransformerFn={dataTransformerFn}
      lineInfo={lineInfo}
      lineAlert={lineAlert}
      itemIsDeletableCondition={itemIsDeletableCondition}
      itemIsEditableCondition={itemIsEditableCondition}
      fieldIsEditableCondition={fieldIsEditableCondition}
      itemIsSelectableCondition={itemIsSelectableCondition}
      redirectOnUpdate={redirectOnUpdate}
      redirectToUpdateAfterCreate={redirectToUpdateAfterCreate}
      onSubmitSuccess={onSubmitSuccess}
      isAlwaysCellEditing={isAlwaysCellEditing}
      customValidation={customValidation}
      choiceFieldsDefaultFiltersRenderer={choiceFieldsDefaultFiltersRenderer}
      disablePagination={disablePagination}
      renderCustomTitleOnEditPage={renderCustomTitleOnEditPage}
      thinThead={thinThead}
      customCreateLabel={customCreateLabel}
    >
      <Routes>
        <Route
          path='/'
          element={
            <CrudTab
              filters={filters}
              setFilterValue={setFilterValue}
              countFilters={countFilters}
              canShowFilter={canShowFilter}
              resetFilters={resetFilters}
              resetFilter={resetFilter}
              result={result}
              columns={columns}
              setColumns={setColumns}
              handlePageChange={changePageWithCache}
              defaultItemsPerPage={defaultItemsPerPage}
              restrictCreate={restrictCreate}
              storeColumnsSelectionKey={storeColumnsSelectionKey}
              seeAllIsAvailable={seeAllIsAvailable}
              qFilterParameterName={qFilterParameterName}
            />
          }
        />
        {
          !restrictCreate && (
            <Route path={'/create'} element={routeCreate ? routeCreate: <CrudCreate renderForm={renderForm} />} />
          )
        }

        {/* path ends with /* because update page can have subCrudForms */}
        <Route path={'/update/:id/*'} element={routeUpdate ? routeUpdate: <CrudUpdate renderForm={renderForm} usePatch={usePatchToUpdate} />} />

        {/* path ends with /* because show page can have subCrudForms */}
        <Route path={'/show/:id/*'} element={routeShow ? routeShow: <CrudShow renderShow={renderShow || renderForm} />} />

        <Route
          path="/*"
          element={<Navigate to={generateUrl('error_404')} />}
        />
      </Routes>
        
    </SuperCrudProvider>
  );
};

