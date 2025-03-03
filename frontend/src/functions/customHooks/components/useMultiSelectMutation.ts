import { useAlert } from "Components/Contexts/AlertContext";
import { CustomFetchError } from "functions/api/customFetch/customFetch";
import { useState } from "react";
import { useOpenState } from "../state/useOpenState";
import { EntityType } from "type/entityTypes";
import { useTranslation } from "react-i18next";

export const useMultiSelectMutation = (
    selectedItemIds: number[],
    mutationFn: (selectedItemIds: number[]) => void,
    target: string,
    action: string,
    onFinish?: () => void,
    onSuccess?: (returnEntities: EntityType[]) => void,
    createSuccessAlert: boolean = true,
): {
    validationModalIsOpen: boolean,
    openValidationModal: () => void,
    closeValidationModal: () => void,
    progress: number,
    mutate: () => Promise<void>,
} => {
    const {t} = useTranslation();
    const {createAlert} = useAlert();
    const [validationModalIsOpen, openValidationModal, closeValidationModal] = useOpenState(false);
    const [progress, setProgress] = useState<number>(0);
    const mutate = async () => {
        let success: boolean = true;
        let returnEntities: any[] = [];
        for(const selectedItemId of selectedItemIds) {
            setProgress(prevProgress => prevProgress + 1);
            try {
                const response = await mutationFn([selectedItemId]);
                returnEntities = returnEntities.concat(response);
            } catch(error) {
                success = false;
                setProgress(prevProgress => prevProgress - 1);
            }
        }

        if(success && createSuccessAlert) {
            createAlert('success', t('success.' + target + '_' + action, {count: selectedItemIds.length}));
        }
        // to show progress bar finish
        setProgress(prevProgress => prevProgress + 1);
        setTimeout(() => {
            if(success && onSuccess) {
                onSuccess(returnEntities);
            }
            if(onFinish) {
                onFinish();
            }
            setProgress(0);
            closeValidationModal();
        }, 1000);
    }

    return {
        validationModalIsOpen,
        openValidationModal,
        closeValidationModal,
        progress,
        mutate,
    };
}
