import { Item } from "type/searchTypes";

export const resolveSuperCrudLineEnabledActions = (
    item: Item,
    isDeletableContext: boolean,
    isEditableContext: boolean,
    itemIsDeletableCondition?: (item: Item) => boolean,
    itemIsEditableCondition?: (item: Item) => boolean,
    itemIsSelectableCondition?: (item: Item) => boolean,
    renderCustomActionControlOnMultipleSelect?: Function,
    disabled?: boolean,
): {
    isEditable: boolean,
    isDeletable: boolean,
    isSelectable: boolean,
} => {

    if(disabled) {
        return {
            isEditable: false,
            isDeletable: false,
            isSelectable: false,
        };
    }

    // apply rules from api as default values
    let isEditable = isEditableContext;
    let isDeletable = isDeletableContext;
    // a line is selectable if we can delete it or if there is a custom action configured on selection
    let isSelectable = isDeletableContext || (renderCustomActionControlOnMultipleSelect !== undefined);

    // then override with front rules
    // if item is deletable it must be selectable too (this can be overwritten by itemIsSelectableCondition)
    if(itemIsDeletableCondition) {
        isDeletable = itemIsDeletableCondition(item);
        if (!renderCustomActionControlOnMultipleSelect) {
            isSelectable = itemIsDeletableCondition(item);
        }
    }
    if(itemIsEditableCondition) {
        isEditable = itemIsEditableCondition(item);
    }
    if(itemIsSelectableCondition) {
        isSelectable = itemIsSelectableCondition(item);
    }

    return {
        isEditable,
        isDeletable,
        isSelectable,
    };
}
