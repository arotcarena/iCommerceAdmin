import { useAlert } from "Components/Contexts/AlertContext";
import { CustomFetchError } from "functions/api/customFetch/customFetch";
import { useOpenState } from "functions/customHooks/state/useOpenState";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { EntityType } from "type/entityTypes";
import { ProgressShow } from "UI/Info/ProgressShow";
import { ConfirmationModal } from "UI/Modal/ConfirmationModal";
import { MultiSelectMutationAction, MultiSelectMutationTarget } from "./MultiSelectMutation";

type Props = {
    target: MultiSelectMutationTarget,
    action: MultiSelectMutationAction,
    mutationFn: (selectedItemIds: number[]) => Promise<any>,
    groupedSelectedItemIds: number[][],
    onFinish?: () => void,
    onSuccess?: (returnEntities: EntityType[]) => void,
    buttonIcon?: string,
    buttonColor?: string,
    buttonAdditionalClass?: string,
}

export const MultiSelectGroupedMutation = ({
    target,
    action,
    mutationFn,
    groupedSelectedItemIds,
    onFinish,
    onSuccess,
    buttonIcon,
    buttonColor = 'primary',
    buttonAdditionalClass, 
}: Props) => {
    const {t} = useTranslation();
    const {createAlert} = useAlert();
    let countSelectedItems = 0;
    for(const group of groupedSelectedItemIds) {
        countSelectedItems += group.length;
    }

    const [validationModalIsOpen, openValidationModal, closeValidationModal] = useOpenState(false);
    const [progress, setProgress] = useState<number>(0);
    const mutate = async () => {
        let success: boolean = true;
        let returnEntities: any[] = [];
        for(const selectedItemIdsGroup of groupedSelectedItemIds) {
            setProgress(prevProgress => prevProgress + 1);
            try {
                const response = await mutationFn(selectedItemIdsGroup);
                returnEntities = returnEntities.concat(response);
            } catch(error) {
                success = false;
                setProgress(prevProgress => prevProgress - 1);
            }
        }

        if(success) {
            createAlert('success', t('success.' + target + '_' + action, {count: countSelectedItems}));
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

    return (
        <>
            <button
                className={'btn btn-' + buttonColor + (buttonAdditionalClass ? ' ' + buttonAdditionalClass: '')}
                onClick={openValidationModal}
            >
                {
                    buttonIcon && (
                        <i className={buttonIcon + ' me-2'}></i>
                    )
                }
                <span>{t('mutate.' + target + '_' + action, {count: countSelectedItems})}</span>
            </button>
            <ConfirmationModal
                show={validationModalIsOpen}
                onConfirmClick={mutate}
                onCloseClick={closeValidationModal}
                submitColor={buttonColor}
                overrideContent={(
                    progress !== 0 ? (
                        <ProgressShow
                            progress={progress}
                            total={groupedSelectedItemIds.length}
                            title={t('pending.' + target + '_' + action, {count: countSelectedItems})}
                        >
                            {t('please_wait')}
                        </ProgressShow>
                    ): undefined
                )}
            >
                {t('confirm.' + target + '_' + action, {count: countSelectedItems})}
            </ConfirmationModal>
        </>
    )
}
