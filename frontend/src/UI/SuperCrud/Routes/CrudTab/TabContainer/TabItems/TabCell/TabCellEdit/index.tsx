import { useFormik } from "formik";
import * as Yup from 'yup';
import { createFieldValidationSchema, needValidationSchema } from "functions/form/validation/schemaConstructor";
import { usePatchItem } from "functions/customHooks/api/queries/itemQueries";
import { useMutation } from "@tanstack/react-query";
import { useSuperCrud } from "Components/Contexts/SuperCrudContext";
import { TabColumn, TabItemType } from "type/superCrudTypes";
import { Spinner } from "reactstrap";
import { useAlert } from "Components/Contexts/AlertContext";
import { useTranslation } from "react-i18next";
import { resolveConstraintsViolationMessage } from "functions/api/error/constraintsViolationMessageResolver";
import { resolveDefaultFieldValue } from "functions/crud/defaultItemCreator";
import { TabCellInput } from "./TabCellInput";
import { TabCellInputAlwaysOpen } from "./TabCellInputAlwaysOpen";
import { resolveChoiceFieldsDefaultFilters } from "functions/crud/choiceFieldsDefaultFiltersResolver";

type Props = {
    column: TabColumn,
    item: TabItemType,
    field: string,
    closeEdit: () => void,
    isEditing: boolean,
    editCell: (item: TabItemType, field: string) => void,
    editNextCell: () => void,
};

export const TabCellEdit = ({
    column,
    item,
    field,
    closeEdit,
    isEditing,
    editCell,
    editNextCell,
}: Props) => {

    const {t} = useTranslation();
    const {createAlert} = useAlert();

    const {
        forceFetch, 
        writeEndpoint,
        isAlwaysCellEditing,
        choiceFieldsDefaultFiltersRenderer,
        parentIri,
        parentPropertyName
    } = useSuperCrud();

    let value: any = item[field] ?? resolveDefaultFieldValue(column);

    const patchItem = usePatchItem(writeEndpoint, [column], parentIri, parentPropertyName);
    const {mutate, isPending} = useMutation({
        mutationFn: (value: any) => patchItem(item.id, {[field]: value}),
        onSuccess: () => {
            if(!isAlwaysCellEditing) {
                createAlert('success', t('success.item_update'));
            }
            forceFetch();
            if(!isAlwaysCellEditing) {
                closeEdit();
            }
        },
        onError: (e: any) => {
            createAlert('danger', resolveConstraintsViolationMessage(e, field));
        }
    });

    const validation: any = useFormik({
        enableReinitialize: true,
        initialValues: {
            value: value
        },
        validationSchema: needValidationSchema(column) ? Yup.object({ //image upload field constraints are custom managed 
            value: createFieldValidationSchema(column.type, column?.constraints, column?.multiple, column?.endpoint),
        }): null,
        onSubmit: (formData: {value: any}): void => {
            mutate(formData.value);
        }
    });

    const handleSubmit = () => {
        validation.handleSubmit();
    };

    const defaultFilters = resolveChoiceFieldsDefaultFilters(item, choiceFieldsDefaultFiltersRenderer, column);

    return (
        <div className="position-relative" style={{opacity: isPending ? '.3': '1'}}>
            {
                isPending && (
                    <div className="position-center">
                        <Spinner />
                    </div>
                )
            }
            {
                isAlwaysCellEditing ? (
                    <TabCellInputAlwaysOpen
                        column={column}
                        onSubmit={handleSubmit}
                        validation={validation}
                        isEditing={isEditing}
                        editCell={editCell}
                        editNextCell={editNextCell}
                        item={item}
                        closeEdit={closeEdit}
                        defaultFilters={defaultFilters}
                    />
                ): (
                    <TabCellInput
                        column={column}
                        onSubmit={handleSubmit}
                        closeEdit={closeEdit}
                        validation={validation}
                        defaultFilters={defaultFilters}
                    />
                )
            }
        </div>
    )
}
