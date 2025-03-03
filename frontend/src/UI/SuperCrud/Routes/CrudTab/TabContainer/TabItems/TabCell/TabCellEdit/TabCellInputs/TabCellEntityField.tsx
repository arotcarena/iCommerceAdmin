import { useSuperCrud } from "Components/Contexts/SuperCrudContext";
import { EntitySelectFieldWithFormik } from "UI/Form/FormFieldWithFormik/EntitySelectFieldWithFormik";
import { EntitySuggestFieldWithFormik } from "UI/Form/FormFieldWithFormik/EntitySuggestFieldWithFormik";
import { useEffect } from "react";

type Props = {
    validation: any,
    multiple?: boolean,
    endpoint: string,
    labelProperty: string,
    complementLabelProperty?: string,
    closeEdit: () => void,
    onSubmit: () => void,
    maxSuggestedItems?: number
    showFullChoiceList?: boolean,
    [key: string]: any,
};


export const TabCellEntityField = ({
    validation,
    multiple = false,
    endpoint,
    labelProperty,
    complementLabelProperty,
    closeEdit,
    onSubmit,
    maxSuggestedItems,
    showFullChoiceList,
    ...props
}: Props) => {
    const {isAlwaysCellEditing} = useSuperCrud();

    const handleSelect = () => {
        if(!multiple) {
            onSubmit();
        }
    }

    //This replace the classic onBlur on input because it cannot be controlled as we want
    useEffect(() => {
        if(isAlwaysCellEditing) {
            return;
        }
        const handleBlur = async () => {
            await onSubmit();
            closeEdit();
        }

        document.body.addEventListener('click', handleBlur);
        return () => document.body.removeEventListener('click', handleBlur)
    }, []);

    const stopPropagation = (e: any) => e.stopPropagation();

    return (
        <div onClick={stopPropagation}>
            {
                showFullChoiceList ? (
                    <EntitySelectFieldWithFormik
                        multiple={multiple}
                        endpoint={endpoint}
                        name="value"
                        validation={validation}
                        labelProperty={labelProperty}
                        complementLabelProperty={complementLabelProperty}
                        onSelect={handleSelect}
                        maxSuggestedItems={maxSuggestedItems}
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
                        defaultIsOpen={false}
                        onSelect={handleSelect}
                        maxSuggestedItems={maxSuggestedItems}
                        {...props}
                    />
                )
            }
        </div>
    )
}
