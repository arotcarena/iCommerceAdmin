import React, { Fragment, useMemo } from "react";
import { Table } from "reactstrap";
import { TabItems } from "./TabItems";
import { Columns } from "./Columns";
import { useSuperCrud } from "Components/Contexts/SuperCrudContext";
import { TabItemType } from "type/superCrudTypes";
import { FiltersType } from "type/searchTypes";
import { ErrorBoundary } from "react-error-boundary";
import { tableFallbackRender } from "Components/Fallback/tableFallbackRender";
import { reloadPage } from "functions/dom/reload";
import { TabFooterControls } from "./TabFooterControls";
import { useSelectedItems } from "functions/customHooks/table/useSelectedItems";
import { resolveSuperCrudLineEnabledActions } from "functions/crud/superCrudLineEnabledActionsResolver";


type Props = {
  filters: FiltersType,
  setFilterValue: (key: string, value: string|number) => void,
  resetFilter: (key: string) => void,
  tableClass?: any,
  theadClass?: any,
  trClass?: any,
  thClass?: any,
  divClass?: any,
  page: number,
};

export function TabContainer({
  filters,
  setFilterValue,
  resetFilter,
  tableClass = "align-middle table-nowrap",
  theadClass = "table-light text-muted",
  trClass,
  thClass,
  divClass = "table-responsive table-card mb-1 mt-4",
  page,
}: Props) {
  const {
    items,
    renderCustomActionControlOnMultipleSelect,
    globalContext: {isDeletable: isDeletableContext, isEditable: isEditableContext},
    itemIsDeletableCondition,
    itemIsSelectableCondition,
    itemIsEditableCondition,
    disabled,
  } = useSuperCrud();
  
  // selectable items
  const selectableItems = useMemo(() => {
    return items.filter(item => {
      const {isSelectable} = resolveSuperCrudLineEnabledActions(
        item,
        isDeletableContext,
        isEditableContext,
        itemIsDeletableCondition,
        itemIsEditableCondition,
        itemIsSelectableCondition,
        renderCustomActionControlOnMultipleSelect,
        disabled,
      ) ?? [];
      return isSelectable;
    })
  }, [isDeletableContext, renderCustomActionControlOnMultipleSelect, items]);

  // items selection
  const {
    selectedItems,
    toggleSelectItem, 
    toggleSelectAllItems, 
    clearSelectedItems,
    mainCheckboxIsChecked
  } = useSelectedItems(selectableItems);
  
  const handleCheckOne = (item: TabItemType): void => {
    toggleSelectItem(item.id);
  }

  return (
    <Fragment>
      <div className={divClass}>
        <Table hover className={tableClass}>
          <thead className={theadClass}>
            <tr className={trClass}>
              <th>
              {
                selectableItems.length > 0 && (
                  <input type="checkbox" className="form-check-input" id="checkboxAll" checked={mainCheckboxIsChecked} onChange={toggleSelectAllItems} />
                )
              }
              </th>
              <Columns
                thClass={thClass}
                filters={filters}
                setFilterValue={setFilterValue}
                resetFilter={resetFilter}
              />
              <th></th>
            </tr>
          </thead>
          <ErrorBoundary fallbackRender={tableFallbackRender} onReset={reloadPage}>
            <TabItems
              filters={filters}
              selectedItems={selectedItems}
              onCheck={handleCheckOne}
            />
          </ErrorBoundary>
          {
            (selectedItems.length > 0) && (
              <TabFooterControls
                isDeletableContext={isDeletableContext}
                selectedItems={selectedItems}
                renderCustomActionControlOnMultipleSelect={renderCustomActionControlOnMultipleSelect}
                clearSelectedItems={clearSelectedItems}
              />
            )
          }
        </Table>
      </div>
    </Fragment>
  );
};
