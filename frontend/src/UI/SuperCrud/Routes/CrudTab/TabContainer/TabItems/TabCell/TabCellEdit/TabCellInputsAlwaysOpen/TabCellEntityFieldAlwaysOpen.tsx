import { parentHasClassName } from "functions/dom/parentElementChecker";
import { useEffect } from "react";
import { EntitySelectFieldWithFormik } from "UI/Form/FormFieldWithFormik/EntitySelectFieldWithFormik";
import { EntitySuggestFieldWithFormik } from "UI/Form/FormFieldWithFormik/EntitySuggestFieldWithFormik";

type Props = {
    validation: any,
    multiple?: boolean,
    endpoint: string,
    labelProperty: string,
    complementLabelProperty?: string,
    onSubmit: () => void,
    maxSuggestedItems?: number,
    onFocus: () => void,
    isEditing: boolean,
    editNextCell: () => void,
    showFullChoiceList?: boolean,
    closeEdit: () => void,
    [key: string]: any,
};


export const TabCellEntityFieldAlwaysOpen = ({
    validation,
    multiple = false,
    endpoint,
    labelProperty,
    complementLabelProperty,
    onSubmit,
    maxSuggestedItems,
    onFocus,
    isEditing,
    editNextCell,
    showFullChoiceList,
    closeEdit,
    ...props
}: Props) => {
    const handleSelect = () => {
        if(!multiple) {
            onSubmit();
            editNextCell();
        }
    }

    useEffect(() => {
        const handleOutClick = (e: any) => {
            if(
                e.target.getAttribute('class')?.includes('-option') ||
                parentHasClassName(e.target, 'cell-always-open-input-wrapper')
            ) {
                return;
            }
            closeEdit();
        }
        document.addEventListener('click', handleOutClick);
        return () => document.removeEventListener('click', handleOutClick);
    }, []);

    return (
        <>
            {
                showFullChoiceList ? (
                    <EntitySelectFieldWithFormik
                        multiple={multiple}
                        endpoint={endpoint}
                        name="value"
                        validation={validation}
                        labelProperty={labelProperty}
                        complementLabelProperty={complementLabelProperty}
                        defaultIsOpen={isEditing}
                        onSelect={handleSelect}
                        maxSuggestedItems={maxSuggestedItems}
                        onCellFocus={onFocus}
                        submitOnTabKeyDown={false}
                        {...props}
                    />
                ): (
                    <EntitySuggestFieldWithFormik
                        multiple={multiple}
                        endpoint={endpoint}
                        name="value"
                        validation={validation}
                        labelProperty={labelProperty}
                        complementLabelProperty={complementLabelProperty}
                        defaultIsOpen={isEditing}
                        onSelect={handleSelect}
                        maxSuggestedItems={maxSuggestedItems}
                        onCellFocus={onFocus}
                        {...props}
                    />
                )
            }
        </>
    )
}
