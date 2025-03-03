import { ItemsPerPageFilter } from "UI/SearchIndex/ItemsPerPageFilter"
import { QSearchInput } from "UI/SearchIndex/QSearchInput"
import { CardBody, Col, Form, Row } from "reactstrap"
import { TabContainer } from "./TabContainer"
import { TabPagination } from "UI/Pagination/TabPagination"
import { ColumnsSelector } from "./ColumnsSelector"
import { useToggleState } from "functions/customHooks/state/useToggleState"
import { CrudLayout } from "UI/SuperCrud/CrudLayout"
import { FiltersType, SearchResult } from "type/searchTypes"
import { TabColumn } from "type/superCrudTypes"
import { ErrorBoundary } from "react-error-boundary"
import { reloadPage } from "functions/dom/reload"
import { voidFallBackRender } from "Components/Fallback/voidFallbackRender"
import { paginationFallbackRender } from "Components/Fallback/tableFallbackRender"
import { FilterControls } from "UI/SearchIndex/FilterControls"
import { useSuperCrud } from "Components/Contexts/SuperCrudContext"
import { useTranslation } from "react-i18next"

type Props = {
  filters: FiltersType,
  setFilterValue: (key: string, value: string | number | null) => void,
  countFilters: number,
  resetFilters: () => void,
  resetFilter: (name: string) => void,
  canShowFilter: (name: string) => boolean,
  result: SearchResult,
  columns: TabColumn[],
  setColumns: React.Dispatch<React.SetStateAction<TabColumn[]>>,
  handlePageChange: (newPage: number) => void,
  defaultItemsPerPage: number,
  restrictCreate?: boolean,
  storeColumnsSelectionKey?: string,
  seeAllIsAvailable?: boolean,
  qFilterParameterName?: string,
}

export const CrudTab = ({
  filters,
  setFilterValue,
  countFilters,
  resetFilters,
  resetFilter,
  canShowFilter,
  result,
  columns,
  setColumns,
  handlePageChange,
  defaultItemsPerPage,
  restrictCreate = false,
  storeColumnsSelectionKey,
  seeAllIsAvailable = false,
  qFilterParameterName = 'q',
}: Props) => {
  const {t} = useTranslation();
  const {disablePagination, customCreateLabel} = useSuperCrud();
  //columns selector
  const [columnsSelectorIsOpen, toggleOpenColumnsSelector] = useToggleState(false);

  let itemsPerPage: null|number = defaultItemsPerPage;
  if(filters?.itemsPerPage === 'all') {
    itemsPerPage = null;
  }
  if(typeof filters?.itemsPerPage === 'number') {
    itemsPerPage = filters.itemsPerPage;
  }

  return (
    <CrudLayout
      isIndexPage={true}
      showCreateButton={!restrictCreate}
      customCreateLabel={customCreateLabel}
    >
      <CardBody className="border border-dashed border-end-0 border-start-0 pt-4 pb-2">
        <Form>
          <Row className="g-3">
            <Col className="col-12 col-md-8 col-xl-7">
              <QSearchInput
                q={filters[qFilterParameterName]}
                setFilterValue={setFilterValue}
                qParamName={qFilterParameterName}
              />
            </Col>
            <Col className="col-12 col-sm-6 col-md-4 col-xl-3 ms-md-auto">
              {
                !disablePagination && (
                  <ItemsPerPageFilter
                    value={filters.itemsPerPage ? filters.itemsPerPage as number: undefined}
                    setFilterValue={setFilterValue}
                    seeAllIsAvailable={seeAllIsAvailable}
                  />
                )
              }
            </Col>
            <Col className="col-12">
              <FilterControls
                filters={filters}
                countFilters={countFilters}
                resetFilters={resetFilters}
                resetFilter={resetFilter}
                canShowFilter={canShowFilter}
              />
            </Col>
          </Row>
        </Form>
      </CardBody>
      <div className="pt-0">
        {
          result && columns && columns.length > 0 && (
            <div className={'tab-container-wrapper position-relative' + (columnsSelectorIsOpen ? ' expanded': '')} data-testid="super-crud-content">
                <div className="tab-container">
                  <TabContainer
                      filters={filters}
                      setFilterValue={setFilterValue}
                      resetFilter={resetFilter}
                      page={result.currentPage}
                  />
                  <ErrorBoundary fallbackRender={paginationFallbackRender} onReset={reloadPage}>
                    {
                      disablePagination ? (
                        <div className="mt-2 g-3 text-center text-sm-start card-body mx-4 text-muted">
                          { t('count_results', {count: result.count}) }
                        </div>
                      ): (
                        <TabPagination
                          itemsPerPage={itemsPerPage}
                          countShowingItems={result.items.length}
                          totalItems={result.count}
                          page={result.currentPage}
                          onChange={handlePageChange}
                        />
                      )
                    }
                  </ErrorBoundary>
                </div>
              <ErrorBoundary fallbackRender={voidFallBackRender} onReset={reloadPage}>
                <ColumnsSelector 
                  isOpen={columnsSelectorIsOpen}
                  toggleOpen={toggleOpenColumnsSelector}
                  columns={columns}
                  setColumns={setColumns}
                  storeColumnsSelectionKey={storeColumnsSelectionKey}
                />
              </ErrorBoundary>
            </div>
          )
        }
      </div>
    </CrudLayout>
  )
}
