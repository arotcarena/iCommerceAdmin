import { ButtonWithLoading } from "UI/Button/ButtonWithLoading"
import { ReactNode } from "react";
import { useTranslation } from "react-i18next"

type Props = {
    isPending?: boolean,
    onClose?: (e: any) => void,
    validateLabel?: string,
    cancelLabel?: string,
    additionalControl?: ReactNode,
    disabled?: boolean,
    [key: string]: any
};

export const FormSubmitGroup = ({
    isPending, 
    onClose,
    validateLabel,
    cancelLabel,
    additionalControl,
    disabled,
    ...props
}: Props) => {
    const {t} = useTranslation();
    return (
        <div className="d-flex gap-1 flex-wrap form-submit-group" {...props}>
            {
                onClose && (
                    <button onClick={onClose} className="btn btn-light" type="button">
                        {cancelLabel ?? t('cancel')}
                    </button>
                )
            }
            <ButtonWithLoading
                color="success"
                type="submit"
                isLoading={isPending}
                data-testid="submit_button"
                disabled={disabled}
            >
                {validateLabel ?? t('submit')}
            </ButtonWithLoading>
            {
                additionalControl
            }
        </div>
        )
}
