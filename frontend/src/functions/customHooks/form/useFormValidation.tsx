import { useMutation } from "@tanstack/react-query";
import { useAlert } from "Components/Contexts/AlertContext";
import { useFormik } from "formik";
import { removeHydraKeysOnSingleItem } from "functions/api/convertor/apiPlatformConversion/hydra/hydraKeysRemover";
import { CustomFetchError } from "functions/api/customFetch/customFetch";
import { createDefaultItem } from "functions/crud/defaultItemCreator";
import { createUpdateData } from "functions/crud/updateDataCreator";
import { createFieldValidationSchema, needValidationSchema } from "functions/form/validation/schemaConstructor";
import { getStoredFormData, resetStoredFormData, storeFormData } from "functions/storage/form/formDataStorage";
import { resetPendingSavedDataStored, savePendingDataStored, storePendingSavedData } from "functions/storage/form/savedFormDataStorage";
import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Item } from "type/searchTypes";
import { TabColumn } from "type/superCrudTypes";
import * as Yup from 'yup';

export const useFormValidation = (
    columns: TabColumn[],
    mutationFn: (formData: any) => Promise<any>,
    handleSubmitSuccess: (data: any) => void,
    item?: Item,
    storeFormDataKey: string|null = null,//persist form data in sessionStorage with this key (will be used only if no item is passed) 
    storeFormDataPersistantFields?: string[],
    dataTransformerFn?: (formData: any) => any,
    customValidation?: (formData: any) => string[], // return error messages
): {
    isPending: boolean,
    validation: any,
    resetForm: () => void,
} => {
    const {createAlert} = useAlert();
    const {t} = useTranslation();

    let schema = {};
    for(const column of columns) {
        //build validation schema
        if(needValidationSchema(column)) { //image upload field constraints are custom managed
            schema = {
                ...schema,
                [column.name]: createFieldValidationSchema(column.type, column?.constraints, column?.multiple, column?.endpoint)
            };
        }
    }

    //to remove hydra properties set by api platform
    if(item) {
        removeHydraKeysOnSingleItem(item);
    }

    //initial value
    //useMemo is essential to avoid an infinite loop in case of programmatical value change
    const initialValue = useMemo(() => {
        let initialValue: any = item ? createUpdateData(item, columns): null;
        if(!initialValue && storeFormDataKey) {
            //persistance
            initialValue = getStoredFormData(storeFormDataKey);
        }
        if(!initialValue) {
            initialValue = createDefaultItem(columns);
        }
        return initialValue;
    }, [item, columns, storeFormDataKey]);

    const validation = useFormik({
        enableReinitialize: true,
        initialValues: initialValue,
        validationSchema: Yup.object(schema),
        onSubmit: (formData: object) => {
            if(customValidation) {
                const errors = customValidation(formData);
                if(errors.length > 0) {
                    for(const error of errors) {
                        createAlert('danger', error);
                    }
                    return;
                }
            }
            mutate(formData);
        }
    });

    //persistance
    useEffect(() => {
        if(storeFormDataKey) {
            storeFormData(storeFormDataKey, validation.values);
        }
    }, [validation.values]);

    const {mutate, isPending} = useMutation({
        mutationFn: (formData: any) => {
            //custom transformation of data before sending request
            if(dataTransformerFn) {
                formData = dataTransformerFn(formData);
            }
            //only to show save status
            storePendingSavedData(formData);

            return mutationFn(formData);
        },
        onSuccess: (data: any) => {
            //on submit success -> remove persistance
            if(storeFormDataKey) {
                resetStoredFormData(storeFormDataKey, storeFormDataPersistantFields);
            }
            handleSubmitSuccess(data);
            //only to show save status
            savePendingDataStored();
        },
        onError: (e: any) => {
            // apply api validation errors to front validation
            if(e instanceof CustomFetchError && e.status === 422 && e.data?.violations?.length > 0) {
                for(const violation of e.data.violations) {
                    validation.setFieldError(violation.propertyPath, t(violation.message ?? violation.title));
                    validation.setFieldTouched(violation.propertyPath, true, false);
                }
            }
            //only to show save status
            resetPendingSavedDataStored();
        }
    });

    const resetForm = () => {
        const item = createDefaultItem(columns);
        for(const [key, value] of Object.entries(item)) {
            validation.setFieldValue(key, value);
            validation.setFieldTouched(key, false, false);
        }
    }

    return {
        isPending,
        validation,
        resetForm
    }
}
