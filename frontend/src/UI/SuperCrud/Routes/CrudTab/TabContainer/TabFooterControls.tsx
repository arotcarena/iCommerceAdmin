import { useSuperCrud } from "Components/Contexts/SuperCrudContext";
import { MultiSelectMutation } from "Components/Controls/MultiSelectMutation";
import { useDeleteItems } from "functions/customHooks/api/queries/itemQueries";
import { useScrollYListener } from "functions/customHooks/display/useScrollListener";
import { ReactNode, useEffect, useMemo, useRef } from "react";

type Props = {
    isDeletableContext: boolean,
    selectedItems: number[],
    renderCustomActionControlOnMultipleSelect?: (selectedItems: number[], clearSelectedItems: () => void, deleteButtonIsVisible: boolean) => ReactNode,
    clearSelectedItems: () => void,
}

export const TabFooterControls = ({
    isDeletableContext,
    selectedItems,
    renderCustomActionControlOnMultipleSelect,
    clearSelectedItems
}: Props) => {
    const {parentIri, itemIsDeletableCondition, items, forceFetch, writeEndpoint} = useSuperCrud();

    const canDelete = useMemo(() => {
        if(!isDeletableContext) {
            return false;
        }
        if(!itemIsDeletableCondition) {
            return isDeletableContext;
        }
        const fullSelectedItems = items.filter(i => selectedItems.includes(i.id));
        for(const fullSelectedItem of fullSelectedItems) {
            if(!itemIsDeletableCondition(fullSelectedItem)) {
                return false;
            }
        }
        return true;
    }, [isDeletableContext, itemIsDeletableCondition, selectedItems]);


    // remove items
    const deleteItems = useDeleteItems(writeEndpoint);
    const handleFinishDelete = () => {
        forceFetch();
        clearSelectedItems();
    };

    //force sticky design
    const ref = useRef<HTMLTableSectionElement>(null);

    const y = useScrollYListener();

    useEffect(() => {
        //if we are in a subCrud, parentIri exists
        const bottom = parentIri ? '80px': '5px';
        const minDistanceBetweenTableBottomAndScreenBottom = parentIri ? 25: -50;
        const maxDistanceBetweenTableBottomAndScreenBottom = parentIri ? 125: 50;

        if(ref.current && ref.current.parentElement) {
            const tableElt = ref.current.parentElement;
            const footerControls = ref.current;
            // const tableHeight = tableElt.offsetHeight;
            const tableBottom = tableElt.getBoundingClientRect().bottom;
            const distanceBetweenTableBottomAndScreenBottom = window.innerHeight - tableBottom;
            if(distanceBetweenTableBottomAndScreenBottom < minDistanceBetweenTableBottomAndScreenBottom) {
                tableElt.style.setProperty('margin-bottom', '90px');
                footerControls.style.setProperty('position', 'fixed');
                footerControls.style.setProperty('bottom', bottom);
            } else if(distanceBetweenTableBottomAndScreenBottom > maxDistanceBetweenTableBottomAndScreenBottom) {
                tableElt.style.removeProperty('margin-bottom');
                footerControls.style.removeProperty('position');
                footerControls.style.removeProperty('bottom');
            }
        }
    }, [y]);

    return (
        <tfoot ref={ref} className="tab-footer-controls">
            <tr>
                <td colSpan={1000}>
                {
                    renderCustomActionControlOnMultipleSelect && (
                    <div className="mb-2">
                        {
                            renderCustomActionControlOnMultipleSelect(selectedItems, clearSelectedItems, canDelete)
                        }
                    </div>
                    )
                }
                {
                    canDelete && (
                        <MultiSelectMutation
                            target="items"
                            action="removal"
                            selectedItemIds={selectedItems}
                            mutationFn={deleteItems}
                            onSuccess={handleFinishDelete}
                            buttonIcon="ri-delete-bin-fill"
                            buttonColor="danger"
                            data-testid="main-delete-button"
                        />
                    )
                }
                </td>
            </tr>
        </tfoot>
    );
}
