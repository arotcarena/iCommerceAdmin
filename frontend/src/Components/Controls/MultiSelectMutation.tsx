import { useMultiSelectMutation } from "functions/customHooks/components/useMultiSelectMutation";
import { useTranslation } from "react-i18next";
import { EntityType } from "type/entityTypes";
import { ProgressShow } from "UI/Info/ProgressShow";
import { ConfirmationModal } from "UI/Modal/ConfirmationModal";

export type MultiSelectMutationTarget = 'items' | 'proposals' | 'orders' | 'deliveryNotes' | 'invoices' | 'creditNotes' | 'invoices_creditNotes' | 'reminders' | 'paymentDeliveries';

export type MultiSelectMutationAction = 'removal' | 'validation' | 'devalidation' | 'acceptation' | 'invoicing' | 'download' | 'send' | 'markUnpaid' | 'create_proposal_proforma_from_order';

type Props = {
    target: MultiSelectMutationTarget,
    action: MultiSelectMutationAction,
    mutationFn: (selectedItemIds: number[]) => Promise<any>,
    selectedItemIds: number[],
    onFinish?: () => void,
    onSuccess?: (returnEntities: EntityType[]) => void,
    buttonIcon?: string,
    buttonColor?: string,
    buttonAdditionalClass?: string,
    [key: string]: any,
}

export const MultiSelectMutation = ({
    target,
    action,
    mutationFn,
    selectedItemIds,
    onFinish,
    onSuccess,
    buttonIcon,
    buttonColor = 'primary',
    buttonAdditionalClass,
    ...props
}: Props) => {
    const {t} = useTranslation();
    
    const {
        validationModalIsOpen,
        openValidationModal,
        closeValidationModal,
        progress,
        mutate,
    } = useMultiSelectMutation(selectedItemIds, mutationFn, target, action, onFinish, onSuccess);

    return (
        <>
            <button
                className={'btn btn-' + buttonColor + (buttonAdditionalClass ? ' ' + buttonAdditionalClass: '')}
                onClick={openValidationModal}
                {...props}
            >
                {
                    buttonIcon && (
                        <i className={buttonIcon + ' me-2'}></i>
                    )
                }
                <span>{t('mutate.' + target + '_' + action, {count: selectedItemIds.length})}</span>
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
                            total={selectedItemIds.length}
                            title={t('pending.' + target + '_' + action, {count: selectedItemIds.length})}
                        >
                            {t('please_wait')}
                        </ProgressShow>
                    ): undefined
                )}
            >
                {t('confirm.' + target + '_' + action, {count: selectedItemIds.length})}
            </ConfirmationModal>
        </>
    )
}
