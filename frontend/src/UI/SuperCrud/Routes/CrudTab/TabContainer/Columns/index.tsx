import { CrudConditionalDisplay } from "UI/SuperCrud/Utils/CrudConditionalDisplay";
import { ColumnFilter } from "./ColumnFilter";
import { useSuperCrud } from "Components/Contexts/SuperCrudContext";
import { useTranslation } from "react-i18next";
import { FiltersType } from "type/searchTypes";
import { TabColumn } from "type/superCrudTypes";
import { getFutureSortDir } from "functions/sortHelper";

const columnIsSortable = (column: TabColumn) => {
  return column?.isSortable !== false && column.type !== 'address' && !column?.endpoint
};

type Props = {
  filters: FiltersType,
  setFilterValue: (key: string, value: string|number) => void,
  resetFilter: (key: string) => void,
  thClass?: any,
  withoutFilters?: boolean,
}

export const Columns = ({
  filters,
  setFilterValue,
  resetFilter,
  thClass,
  withoutFilters = false,
}: Props) => {
    const {t} = useTranslation();
    const {columns, customFilterRenderers, choiceFieldsDefaultFiltersRenderer, thinThead} = useSuperCrud();
  
    //sort by col
    const handleSortClick = (column: TabColumn) => {
      if(!columnIsSortable(column)) {
        return;
      }
      
      const newDir = getFutureSortDir(filters.sortBy, column.name);
      setFilterValue('sortBy', column.name + '_' + newDir);
    };

    const choiceFieldsDefaultFilters = choiceFieldsDefaultFiltersRenderer ? choiceFieldsDefaultFiltersRenderer(): undefined;

    return (
        columns.map((column, index) => (
          <CrudConditionalDisplay key={index} column={column}>
            <th 
              style={{verticalAlign: 'middle', paddingTop: thinThead ? '5px': undefined, paddingBottom: thinThead ? '5px': undefined}} 
              className={(thClass ? thClass: '') + 'type-' + column.type}
            >
              <span
                style={{cursor: columnIsSortable(column) ? 'pointer': 'text'}} 
                onClick={() => handleSortClick(column)}
              >
                <span
                  title={columnIsSortable(column) ? (
                    t('change_sortBy', {field: t(column.name), dir: '(' + t(getFutureSortDir(filters.sortBy, column.name)) + ')'})
                  ): ''}
                >
                  {t(column.name)}
                </span>
                {
                  columnIsSortable(column) && (
                    <SortDirShow column={column.name} sortBy={filters.sortBy} />
                  )
                }
              </span>
              {
                column.isFiltrable ? (
                  customFilterRenderers && customFilterRenderers[column.name] ? (
                    customFilterRenderers[column.name](filters, setFilterValue, resetFilter, column)
                  ): (
                    <ColumnFilter
                      column={column} 
                      setFilterValue={setFilterValue}
                      filters={filters}
                      resetFilter={resetFilter}
                      choiceFieldDefaultFilters={choiceFieldsDefaultFilters ? choiceFieldsDefaultFilters[column.name]: undefined}
                    />
                  )
                ): (
                  <div style={{height: withoutFilters ? 0: '40px'}}>
                  </div>
                )
              }
            </th>
          </CrudConditionalDisplay>
        ))
    )
}

export const SortDirShow = ({
    column,
    sortBy
}: {
    column: string,
    sortBy: string|number|undefined
}) => {
  if(!sortBy || typeof sortBy !== 'string' || sortBy.split('_')[0] !== column) {
    return;
  }
  return (
    <i style={{marginLeft: '5px'}} className={sortBy.split('_')[1] === 'ASC' ? 'ri-arrow-up-s-fill': 'ri-arrow-down-s-fill'}>
    </i>
  )
}