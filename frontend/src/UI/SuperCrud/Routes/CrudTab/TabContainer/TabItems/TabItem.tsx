import { useOpenState } from "functions/customHooks/state/useOpenState";
import { DeleteModal } from "UI/Modal/DeleteModal";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useDeleteItem } from "functions/customHooks/api/queries/itemQueries";
import { useSuperCrud } from "Components/Contexts/SuperCrudContext";
import { EditingCell, Renderer, TabItemType } from "type/superCrudTypes";
import { useAlert } from "Components/Contexts/AlertContext";
import { useTranslation } from "react-i18next";
import { ErrorBoundary } from "react-error-boundary";
import { TabCell } from "./TabCell";
import { cellFallbackRender } from "Components/Fallback/tableFallbackRender";
import { reloadPage } from "functions/dom/reload";
import { FiltersType, Item } from "type/searchTypes";
import { CrudConditionalDisplay } from "UI/SuperCrud/Utils/CrudConditionalDisplay";
import { LineAlertCard, LineInfoCard } from "./LineAlertCard";
import { resolveSuperCrudLineEnabledActions } from "functions/crud/superCrudLineEnabledActionsResolver";


type Props = {
    item: TabItemType,
    isSelected: boolean,
    onCheck: (item: TabItemType) => void,
    editingCell: EditingCell|null,
    editCell: (item: TabItemType, field: string) => void,
    editNextCell: () => void,
    closeEdit: () => void,
    filters: FiltersType,
    disabled?: boolean,
    trClass?: string,
    renderers?: {[field: string]: Renderer}
};

export const TabItem = ({
    item, 
    isSelected,
    onCheck,
    editingCell,
    editCell,
    editNextCell,
    closeEdit,
    filters,
    disabled,
    trClass,
    renderers,
}: Props) => {
  
  const {t} = useTranslation();
  
  const {
    columns,
    renderers: globalRenderers,
    basePath,
    writeEndpoint,
    forceFetch,
    lineInfo,
    lineAlert,
    globalContext: {isDeletable: isDeletableContext, isEditable: isEditableContext, labelProperty},
    renderCustomActionControlOnMultipleSelect,
    renderCustomActionControlOnLineOver,
    renderCustomActionControlSide,
    itemIsSelectableCondition,
    itemIsDeletableCondition,
    itemIsEditableCondition,
  } = useSuperCrud();
  const correctRenderers = globalRenderers ?? renderers;
  
  const {createAlert} = useAlert();
  
  const navigate = useNavigate();
  
  const deleteItem = useDeleteItem(writeEndpoint);
  const {mutate} = useMutation({
    mutationFn: () => deleteItem(item.id),
    onSuccess: () => {
        forceFetch();
        createAlert('success', t('success.item_removal', {id: item.id}));
        closeDeleteModal();
      },
      onError: (error: Error) => {
        createAlert('danger', error.message ? error.message: t('error.item_removal', {id: item.id}));
      }
    })

  const handleEditItem = () => {
      navigate(basePath + '/update/' + item.id);
  }
  const handleShowItem = () => {
      navigate(basePath + '/show/' + item.id);
  }

  const [deleteModalIsOpen, openDeleteModal, closeDeleteModal] = useOpenState(false);

  const [controlsAreOpen, openControls, closeControls] = useOpenState(false);

  const {isEditable, isDeletable, isSelectable} = resolveSuperCrudLineEnabledActions(
    item,
    isDeletableContext,
    isEditableContext,
    itemIsDeletableCondition,
    itemIsEditableCondition,
    itemIsSelectableCondition,
    renderCustomActionControlOnMultipleSelect,
    disabled,
  );

  return (
    <tr 
      onMouseOver={openControls} 
      onMouseLeave={closeControls} 
      className={(trClass ? trClass + ' ': '') + (lineAlert?.isActive(item) ? 'bg-danger-light': '') + (lineInfo?.isActive(item) ? 'bg-primary-light': '')}
    >
      {
        isDeletable && (
          <DeleteModal
            show={deleteModalIsOpen}
            onDeleteClick={mutate}
            onCloseClick={closeDeleteModal}
            item={item}
            label={labelProperty !== 'id' ? item[labelProperty]: undefined}
          />
        )
      }
      <td style={{height: '70px'}}>
        {
          isSelectable && (
            <input type="checkbox" className="form-check-input" checked={isSelected} onChange={() => onCheck(item)} />
          )
        }
      </td>
      {
        columns.map((column, index) => (
          <CrudConditionalDisplay column={column} key={index}>
            <ErrorBoundary key={index} fallbackRender={cellFallbackRender} onReset={reloadPage}>
              <TabCell
                item={item}
                column={column}
                itemIsEditable={isEditable}
                renderer={correctRenderers && correctRenderers[column.name] ? correctRenderers[column.name]: null}
                isEditing={editingCell?.item.id === item.id && editingCell?.field === column.name}
                editCell={editCell}
                editNextCell={editNextCell}
                closeEdit={closeEdit}
                filter={filters[column.name] || null}
                qFilter={filters?.q}
              />
            </ErrorBoundary>
          </CrudConditionalDisplay>
        ))
      }
      <td className={'tab-controls' + (controlsAreOpen ? ' open': '')}>
        <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
          {
            lineAlert?.isActive(item) && lineAlert.renderMessage && (
              <LineAlertCard
                message={lineAlert.renderMessage(item)}
              />
            )
          }
          {
            lineInfo?.isActive(item) && lineInfo.renderMessage && (
              <LineInfoCard
                message={lineInfo.renderMessage(item)}
              />
            )
          }
          {
            renderCustomActionControlSide === 'left' && renderCustomActionControlOnLineOver && (
              <div style={{marginRight: '5px'}}>
                {renderCustomActionControlOnLineOver(item, controlsAreOpen, forceFetch)}
              </div>
            )
          }
          <button onClick={handleShowItem} type="button" className="btn btn-secondary" style={{maxHeight: '40px'}}>
            <i className="ri-eye-2-fill ri-xl"></i>
          </button>
          {
            isEditable && (
              <button onClick={handleEditItem} type="button" style={{marginLeft: '5px', maxHeight: '40px'}} className="btn btn-success">
                <i className="ri-edit-2-fill ri-xl"></i>
              </button>
            )
          }
          {
            isDeletable && (
              <button onClick={openDeleteModal} type="button" style={{marginLeft: '5px', maxHeight: '40px'}} className="btn btn-danger">
                <i className="ri-delete-bin-fill ri-xl"></i>
              </button>
            )
          }
          {
            renderCustomActionControlOnLineOver && renderCustomActionControlSide !== 'left' && (
              <div style={{marginLeft: '5px'}}>
                {renderCustomActionControlOnLineOver(item, controlsAreOpen, forceFetch)}
              </div>
            )
          }
        </div>
      </td>
    </tr>
  )
}
