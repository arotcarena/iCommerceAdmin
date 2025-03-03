import { PropsWithChildren, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Modal, ModalBody } from "reactstrap";
import { ButtonWithLoading } from "UI/Button/ButtonWithLoading";

type Props = PropsWithChildren<{
    show: boolean,
    onConfirmClick: () => void,
    onCloseClick: () => void,
    label?: string,
    submitColor?: string,
    isPending?: boolean,
    overrideContent?: ReactNode,
}>;

export const ConfirmationModal = ({ 
    show, 
    onConfirmClick, 
    onCloseClick,
    label,
    submitColor = 'primary',
    isPending,
    overrideContent,
    children
}: Props) => {
  const {t} = useTranslation();

  const handleClose = () => {
    if(!isPending) {
      onCloseClick();
    }
  }

  return (
    <Modal isOpen={show} toggle={handleClose} centered={true}>
      <ModalBody className="py-3 px-5">
        {
          overrideContent ? overrideContent: (
            <>
              <div className="mt-2 text-center">
                <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
                  <h4>{t('question.sure')}</h4>
                  <p className="text-muted mx-4 mb-0">
                    {children ?? t('confirm.action')}
                  </p>
                  <div className="mt-3 mb-4 fw-bold">
                    {
                      label
                    }
                  </div>
                </div>
              </div>
              <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
                <button
                  type="button"
                  className="btn w-sm btn-light"
                  data-bs-dismiss="modal"
                  onClick={onCloseClick}
                  disabled={isPending}
                >
                  {t('close')}
                </button>
                <ButtonWithLoading
                  color={submitColor}
                  type="button"
                  className="w-sm"
                  id="confirm-action"
                  onClick={onConfirmClick}
                  isLoading={isPending}
                >
                  {t('confirm.action')}
                </ButtonWithLoading>
              </div>
            </>
          )
        }
      </ModalBody>
    </Modal>
  );
};
