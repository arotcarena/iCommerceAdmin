import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { Item } from "type/searchTypes";

/**
 * selectedItems is an array of ids
 */
export const useSelectedItems = (items: Item[]): {
    toggleSelectItem: (itemId: number) => void,
    toggleSelectAllItems: () => void,
    clearSelectedItems: () => void,
    selectedItems: number[],
    mainCheckboxIsChecked: boolean,
    setSelectedItems: Dispatch<SetStateAction<number[]>>
} => {
    const [selectedItems, setSelectedItems] = useState<number[]>([]);

    const visibleSelectedItems = useMemo(() => {
        return selectedItems.filter((si: number) => items.find(item => item.id === si));
    }, [selectedItems, items]);

    const toggleSelectItem = (itemId: number) => {
        if(selectedItems.find((si: number) => si === itemId)) {
            //if already selected, remove from selectedItems
            setSelectedItems(selectedItems => selectedItems.filter((si: number) => si !== itemId));
        } else {
            //else add to selectedItems
            setSelectedItems(selectedItems => ([
                ...selectedItems,
                itemId,
            ]));
        }
    };

    const toggleSelectAllVisibleItems = () => {
        if(visibleSelectedItems.length === items.length) {
            const itemsIds = items.map(item => item.id);
            setSelectedItems(selectedItems => selectedItems.filter((si: number) => !itemsIds.includes(si)));
        } else {
            setSelectedItems(selectedItems => ([
                ...selectedItems,
                ...items.filter(item => !selectedItems.includes(item.id)).map(item => item.id)
            ]));
        }
    };

    const clearVisibleSelectedItems = () => {
        setSelectedItems(selectedItems => selectedItems.filter((si: number) => !visibleSelectedItems.includes(si)));
    };

    return {
        toggleSelectItem,
        toggleSelectAllItems: toggleSelectAllVisibleItems,
        clearSelectedItems: clearVisibleSelectedItems,
        selectedItems: visibleSelectedItems,
        mainCheckboxIsChecked: (visibleSelectedItems.length === items.length) && items.length > 0,
        setSelectedItems,
    };
}
