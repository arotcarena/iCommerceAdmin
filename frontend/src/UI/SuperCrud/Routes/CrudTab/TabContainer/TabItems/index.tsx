import { useEditingCell } from "functions/customHooks/CRUD/CrudTab/useEditingCell";
import { useSuperCrud } from "Components/Contexts/SuperCrudContext";
import { TabItemType } from "type/superCrudTypes";
import { TabItem } from "./TabItem";
import { LineCreateItem } from "./LineCreateItem";
import { FiltersType } from "type/searchTypes";
import { Loader } from "UI/Common/Loader";


type Props = {
    filters: FiltersType,
    selectedItems: number[],
    onCheck: (item: TabItemType) => void,
}

export const TabItems = ({
    filters,
    selectedItems,
    onCheck,
}: Props) => {

    const {columns, items, isLoading, hasLineCreate, disabled, itemIsEditableCondition} = useSuperCrud();
    const {editingCell, editCell, handleKeyDown, closeEdit, editNextCell} = useEditingCell(columns, items, itemIsEditableCondition);


    return (
        <tbody className={'tab-body position-relative with-loading-opacity' + (isLoading ? ' is-loading': '')} onKeyDown={handleKeyDown}>
            {
                hasLineCreate && !disabled && <LineCreateItem />
            }
            {
                isLoading && items.length === 0 && (
                    <tr>
                        <td style={{position: 'absolute', left: '50px', top: '50px', border: 'none'}}>
                            <Loader />
                        </td>
                    </tr>
                )
            }
            {
                items.map((item, index) => {
                    return (
                        <TabItem
                            key={index}
                            isSelected={selectedItems.find(si => si === item.id) ? true: false} 
                            item={item} 
                            onCheck={onCheck}
                            editingCell={editingCell}
                            editCell={editCell}
                            editNextCell={editNextCell}
                            closeEdit={closeEdit}
                            filters={filters}
                            disabled={disabled}
                        />
                    );
                })
            }
        </tbody>
    )
}